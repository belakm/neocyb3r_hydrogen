import {Section, Text} from '~/components';

export const HomepageHero = () => {
  const disclaimer = false;
  return (
    <Section padding="y">
      <div className="px-6 md:px-8 lg:px-12">
        <div
          className="stripes flex items-center justify-center"
          style={{marginTop: '6rem'}}
        >
          <div
            className="bg-contrast border border-primary rounded backdrop-blur-lg relative"
            style={{maxWidth: 640, margin: '-6rem 0 1rem', padding: '1rem'}}
          >
            {false && (
              <p
                className="text-center p-2 rounded"
                style={{background: 'yellow', color: 'black'}}
              >
                Due to busy IRL merch selling this month my new products aren't
                online yet.
                <br />
                Big restock coming January!
              </p>
            )}
            <p className="p-2"></p>
            <p className="text-center">
              <Text size="lead">
                Hey! Take a looky 👀, i hope you find what you came here for!!!
                {'\n\n'}
                In short, im the maker of the stuff below. I LOVE ANIMALéS 🐈
                and GAMES 👾 and YOU 🫵{'\n\n'}
                Follow me on instagram under{' '}
                <a
                  href="https://www.instagram.com/sitri.wtf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-notice"
                >
                  @sitri.wtf
                </a>{' '}
                :){'\n\n'}
                Smooch,{'\n'}
                <span className="text-2xl">SITRI 😈</span>
              </Text>
            </p>
            <img
              alt="Chibi figure of Sitri"
              className="hero-skew hidden md:flex"
              src="/chibisitri.png"
              style={{
                position: 'absolute',
                right: -60,
                bottom: -20,
                width: 120,
              }}
            />
            <img
              alt="Chibi figure of Sitri"
              className="hero-skew block md:hidden"
              src="/chibisitri.png"
              style={{position: 'absolute', right: -10, bottom: -1, width: 60}}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};
