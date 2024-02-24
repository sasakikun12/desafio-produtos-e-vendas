import Input from "../components/Input";

const SaleForm = ({ action, productsList, sale, onSaleChange }) => {
  const isCreate = () => action === "create";

  return (
    <>
      {isCreate() && (
        <>
          <label className="mb-2">Produto</label>
          <select
            name="productId"
            value={sale?.productId || ""}
            onChange={onSaleChange}
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
        text={"Quantidade"}
        type={"number"}
        id={"quantity"}
        value={sale?.quantity || ""}
        onChange={onSaleChange}
      />

      <Input
        text={"Valor"}
        type={"number"}
        id={"value"}
        step={0.01}
        value={sale?.value || ""}
        onChange={onSaleChange}
      />

      <Input
        text={"Data"}
        type={"date"}
        id={"saleDate"}
        value={sale?.saleDate || ""}
        onChange={onSaleChange}
      />
    </>
  );
};

export default SaleForm;
