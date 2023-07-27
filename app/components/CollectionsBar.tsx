import {Image} from '@shopify/hydrogen';

import type {HomepageFeaturedCollectionsQuery} from 'storefrontapi.generated';
import {Heading, Section, Grid, Link, Divider, Text} from '~/components';

type FeaturedCollectionsProps = HomepageFeaturedCollectionsQuery & {
  [key: string]: any;
};

interface CollectionBoxProps {
  imageUrl: string;
  handle: string;
  title: string;
}

const CollectionBox = ({ handle, imageUrl, title}: CollectionBoxProps) => {
  return <Link to={`/collections/${handle}`}>
    <div className="grid gap-4" >
      <button
        className="border border-primary p-4 md:p-8 rounded flex md:justify-center items-center bob-hover"
        style={{ backgroundColor: "#ff9bcd" }}
      >
        <img src={imageUrl} className="pr-4 hidden md:block" style={{ width: 120}} />
        <img src={imageUrl} className="pr-4 block md:hidden" style={{ width: 70}} />
        <Heading size="lead" className="text-contrast">{title}</Heading>
      </button>
    </div>
  </Link>
}

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
          return <CollectionBox
            handle={collection.handle}
            key={collection.id}
            imageUrl={collection.image.url}
            title={collection.title}
          />;
        })}
      </Grid>
    </Section>
  );
}
