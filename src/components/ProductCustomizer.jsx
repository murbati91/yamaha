import Advanced3DConfigurator from './Advanced3DConfigurator';

const ProductCustomizer = ({ product, onClose }) => {
  // Use the advanced 3D configurator for all products
  return <Advanced3DConfigurator product={product} onClose={onClose} />;
};

export default ProductCustomizer;
