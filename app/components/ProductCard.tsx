import clsx from 'clsx';
import type {ShopifyAnalyticsProduct} from '@shopify/hydrogen';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import type {MoneyV2, Product} from '@shopify/hydrogen/storefront-api-types';

import type {ProductCardFragment} from 'storefrontapi.generated';
import {Text, Link, AddToCartButton} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import {useState, useEffect} from "react";

const randomInt = (min: number , max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const cadeDirection = (integer: number) =>
  integer === 1 ? "top" :
  integer === 2 ? "right" :
  integer === 3 ? "bottom" :
  "left";
const cadeOffset = (integer: number) => {
  if (integer === 1) {
    // top
    return {
      left: `${randomInt(0, 70)}%`
    }
  } else if (integer === 2) {
    // right
    return {
      top: `${randomInt(0, 70)}%`
    }
  } else if (integer === 3) {
    // bottom
    return {
      left: `${randomInt(0, 70)}%`
    }
  } else {
    // left
    return {
      top: `${randomInt(0, 70)}%`
    }
  }
}

const RandomCat = () => {
  const [cat, setCat] = useState(randomInt(1, 5));
  const [activated, setActivated] = useState(false);
  const [direction, setDirection] = useState(cadeDirection(randomInt(1, 4)));
  const [counter, setCounter] = useState(0);
  const [cadeStyle, setCadeStyle] = useState({});

  const showAndHideCat = () => {
    // Display the thing
    const newDirection = randomInt(1, 4)
    setDirection(cadeDirection(newDirection));
    setCadeStyle(cadeOffset(newDirection));
    setActivated(true);
    // Hide the thing after 5 seconds
    setTimeout(() => {
      setActivated(false);
      setCounter(prevState => prevState + 1);
    }, 5000);
  }

  useEffect(() => {
    const randomDelay = randomInt(3, 25); // generate random number between 1 to 10 seconds.
    const timeoutId = setTimeout(showAndHideCat, randomDelay * 1000);
    // Clean up function
    return () => {
      clearTimeout(timeoutId);
    }
  }, [counter]);

  return activated ?
    <img
      className={`cade ${activated ? "activated" : ""} ${direction}`}
      src={"cats/cate" + cat + ".png"}
      alt="cat says hello :)"
      title="Hello from Sitri :)"
      style={cadeStyle}
    /> : null;
}

export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
}: {
  product: ProductCardFragment;
  label?: string;
  className?: string;
  loading?: HTMLImageElement['loading'];
  onClick?: () => void;
  quickAdd?: boolean;
}) {
  let cardLabel;

  const cardProduct: Product = product?.variants
    ? (product as Product)
    : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const {image, price, compareAtPrice} = firstVariant;

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };

  return (
    <div className="flex flex-col gap-2 enlarge-hover">
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
      >
        <div className={clsx('grid gap-4', className)}>
          <div className="card-image aspect-[4/5] bg-primary/5 relative">
            {image && (
              <Image
                className="object-cover w-full fadeIn "
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                aspectRatio="4/5"
                data={image}
                alt={image.altText || `Picture of ${product.title}`}
                loading={loading}
              />
            )}
            {
              cardLabel && <Text
                as="label"
                size="fine"
                className="absolute top-0 right-0 m-4 text-right text-notice p-2 bg-contrast border border-primary rounded"
              >
                {cardLabel}
              </Text>
            }
            <RandomCat />
          </div>
          <div className="grid gap-1">
            <Text
              className="w-full overflow-hidden whitespace-nowrap text-ellipsis "
              as="h3"
              size="lead"
            >
              {product.title}
            </Text>
            <div className="flex gap-4">
              <Text className="flex gap-4">
                <Money withoutTrailingZeros data={price!} />
                {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
                  <CompareAtPrice
                    className={'opacity-50'}
                    data={compareAtPrice as MoneyV2}
                  />
                )}
              </Text>
            </div>
          </div>
        </div>
      </Link>
      {quickAdd && (
        <AddToCartButton
          lines={[
            {
              quantity: 1,
              merchandiseId: firstVariant.id,
            },
          ]}
          variant="secondary"
          className="mt-2"
          analytics={{
            products: [productAnalytics],
            totalValue: parseFloat(productAnalytics.price),
          }}
        >
          <Text as="span" className="flex items-center justify-center gap-2">
            Add to Cart
          </Text>
        </AddToCartButton>
      )}
    </div>
  );
}

function CompareAtPrice({
  data,
  className,
}: {
  data: MoneyV2;
  className?: string;
}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
