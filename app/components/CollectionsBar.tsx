import {Image} from '@shopify/hydrogen';

import type {HomepageFeaturedCollectionsQuery} from 'storefrontapi.generated';
import {Heading, Section, Grid, Link, Divider} from '~/components';

type FeaturedCollectionsProps = HomepageFeaturedCollectionsQuery & {
  [key: string]: any;
};

export function CollectionsBar({
  collections,
  ...props
}: FeaturedCollectionsProps) {
  const haveCollections = collections?.nodes?.length > 0;
  if (!haveCollections) return null;

  const collectionsNodes = collections.nodes;

  return (
    <Section {...props} className="md:py-0 lg:py-0">
      <Grid items={collectionsNodes.length}>
        {collectionsNodes.map((collection) => {
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className="grid gap-4">
                <button className="border border-primary p-8 rounded bg-secondary">
                  <Heading size="lead">{collection.title}</Heading>
                </button>
              </div>
            </Link>
          );
        })}
      </Grid>
    </Section>
  );
}
