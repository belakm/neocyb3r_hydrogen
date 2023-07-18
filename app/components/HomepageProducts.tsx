import type {HomepageFeaturedProductsQuery} from 'storefrontapi.generated';
import {ProductCard, Section, Grid} from '~/components';

const mockProducts = {
  nodes: new Array(12).fill(''),
};

type ProductSwimlaneProps = HomepageFeaturedProductsQuery & {
  title?: string;
  count?: number;
};

export function HomepageProducts({
  products = mockProducts,
  count = 12,
  ...props
}: ProductSwimlaneProps) {
  return (
    <Section padding="y" {...props}>
      <Grid items={products.nodes.length} className="px-6 md:px-8 lg:px-12">
          {products.nodes.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              className="snap-start p-4 border border-primary rounded-md bg-contrast"
            />
          ))}
      </Grid>
    </Section>
  );
}
