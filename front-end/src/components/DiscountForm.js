import Input from "../components/Input";

const SaleForm = ({ action, productsList, discount, onDiscountChange }) => {
  const isCreate = () => action === "create";

  return (
    <>
      {isCreate() && (
        <>
          <label className="mb-2">Produto</label>
          <select
            name="productId"
            value={discount?.productId || ""}
            onChange={onDiscountChange}
            className="form-select"
            aria-label="Selecione"
          >
            <option>Selecione</option>
            {productsList &&
              productsList.map((product, index) => (
                <option key={index} value={`${product.id}`}>
                  {product.name}
                </option>
              ))}
          </select>
        </>
      )}

      <Input
        text={"Valor"}
        type={"number"}
        id={"value"}
        step={0.01}
        value={discount?.value || ""}
        onChange={onDiscountChange}
      />

      <Input
        text={"Data Inicial"}
        type={"date"}
        id={"startDate"}
        value={discount?.startDate || ""}
        onChange={onDiscountChange}
      />

      <Input
        text={"Data Final"}
        type={"date"}
        id={"endDate"}
        value={discount?.endDate || ""}
        onChange={onDiscountChange}
      />

      <Input
        text={"Hora Inicial"}
        type={"text"}
        id={"startTime"}
        value={discount?.startTime || ""}
        onChange={onDiscountChange}
        maxLength="5"
        placeholder="HH:MM:SS"
      />

      <Input
        text={"Hora Final"}
        type={"text"}
        id={"endTime"}
        value={discount?.endTime || ""}
        onChange={onDiscountChange}
        maxLength="5"
        placeholder="HH:MM:SS"
      />
    </>
  );
};

export default SaleForm;
