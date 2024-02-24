import Input from "../components/Input";

const ProductForm = ({ action, product, onProductChange }) => {
  const isCreate = () => action === "create";

  return (
    <>
      {isCreate() && (
        <Input
          text={"Nome"}
          type={"text"}
          id={"name"}
          value={product?.name || ""}
          onChange={onProductChange}
        />
      )}
      {isCreate() && (
        <>
          <label className="mb-2">Tipo de produto</label>
          <select
            name="type"
            value={product?.type || ""}
            onChange={onProductChange}
            className="form-select"
            aria-label="Selecione"
          >
            <option>Selecione</option>
            <option value="simples">Simples</option>
            <option value="digital">Digital</option>
          </select>
        </>
      )}

      <Input
        text={"Valor"}
        type={"number"}
        id={"value"}
        step={0.01}
        value={product?.value || ""}
        onChange={onProductChange}
      />

      <Input
        text={"Descrição"}
        type={"text"}
        id={"description"}
        value={product?.description || ""}
        onChange={onProductChange}
      />

      <Input
        text={"Quantidade"}
        type={"number"}
        id={"quantity"}
        value={product?.quantity || ""}
        onChange={onProductChange}
      />

      <Input
        text={"Link"}
        type={"text"}
        id={"link"}
        value={product?.link || ""}
        onChange={onProductChange}
      />
    </>
  );
};

export default ProductForm;
