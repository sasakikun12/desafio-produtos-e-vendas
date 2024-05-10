const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET_KEY = process.env.SECRET_TOKEN;
const UserRepository = require("../models/usersModel");

function findAllUsers(req, res) {
  UserRepository.findAll().then((result) => res.json(result));
}

function findUser(req, res) {
  const { username } = req.params;
  UserRepository.findOne({ where: { username } }).then((result) =>
    res.json(result)
  );
}

async function addUser(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ username }, JWT_SECRET_KEY);
    const user = await UserRepository.create({
      username,
      password: hashedPassword,
      token,
    });
    res.status(201).json({ message: "Usuário cadastrado com sucesso!", user: {token, username, userId: user.id} });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    const user = await UserRepository.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Senha inválida!" });
    }

    res.json({token : user.token, username, userId: user.id});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateUser(req, res) {
  const { username, oldPassword, password } = req.body;

  try {
    const user = await UserRepository.findOne({ where: { username } });
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Senha anterior inválida!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserRepository.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          username,
        },
      }
    );

    return res.status(200).json({ message: `Senha atualizada com sucesso.` });
  } catch (error) {
    console.error("Falha ao atualizar o usuário:", error);
    return res
      .status(500)
      .json({ error: "Falha ao atualizar o usuário", message: error.message });
  }
}

async function deleteUser(req, res) {
  const { username } = req.params;

  try {
    const deletedCount = await UserRepository.destroy({
      where: { username },
    });

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ message: `Usuário '${username}' não encontrado.` });
    }

    return res
      .status(200)
      .json({ message: `Usuário '${username}' deletado com sucesso.` });
  } catch (error) {
    console.error("Falha ao deletar o usuário:", error);
    return res
      .status(500)
      .json({ error: "Falha ao deletar o usuário", message: error.message });
  }
}

module.exports = {
  findAllUsers,
  addUser,
  loginUser,
  findUser,
  updateUser,
  deleteUser,
};
