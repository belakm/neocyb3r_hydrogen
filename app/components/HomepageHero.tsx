import {Section, Text} from '~/components';

export const HomepageHero = () => {
  return (
  <Section padding="y">
    <div className="px-6 md:px-8 lg:px-12">
      <div className="stripes flex items-center justify-center" style={{ marginTop: "6rem" }}>
        <div className="bg-contrast border border-primary rounded backdrop-blur-lg" style={{ maxWidth: 640, margin: "-6rem 0 1rem", padding: "1rem" }}>
          <Text size="lead">
          Hey! Take a looky 👀, i hope you find what you came here for!!!{"\n\n"}
          In short, im the maker and creator of the stuff below. I LOVE ANIMALéS and GAMES and YOU!{"\n\n"}
          Follow me on instagram under <a href="https://www.instagram.com/zelosumljivarastlina" target="_blank" rel="noopener noreferrer" className="text-notice">@zelosumljivarastlina</a> :){"\n\n"}
          Smooch,{"\n"}<span className="text-2xl">SITRI 😈</span></Text>
        </div>
      </div>
    </div>
  </Section>
  )
}
