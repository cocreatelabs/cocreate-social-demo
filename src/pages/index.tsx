import { Box, VStack, Center, Text } from "@chakra-ui/react";
import { useSocialAccount } from "../useSocialAccount";
import { SocialButton } from "../components/SocialButton";
import Head from "next/head";
import { FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";
import { discord, twitter } from "@usecocreate/sdk";

export default function Home() {
  const { username: discordUsername, disconnect: disconnectDiscord } =
    useSocialAccount("discord_username", "discord_username");

  const { username: twitterUsername, disconnect: disconnectTwitter } =
    useSocialAccount("twitter_username", "twitter_username");

  const { username: instagramUsername, disconnect: disconnectInstagram } =
    useSocialAccount("instagram_username", "instagram_username");

  const connectDiscord = () => {
    const link = discord.connectDiscordLink({
      clientId: "026086c8-86fa-46d8-b34b-4e4f284450dc",
      redirectUrl: `${window.location.origin}/`,
      userEmail: "ankush@usecocreate.io",
      sessionVerifier: "my_session_verifier",
      isDevEnv: true,
    });
    window.location.href = link;
  };

  const connectTwitter = () => {
    const link = twitter.connectTwitterLink({
      clientId: "026086c8-86fa-46d8-b34b-4e4f284450dc",
      redirectUrl: `${window.location.origin}/`,
      userEmail: "ankush@usecocreate.io",
      sessionVerifier: "my_session_verifier",
      isDevEnv: true,
    });
    window.location.href = link;
  };

  const connectInstagram = () => {
    const apiUrl = "https://dev-backend.aws.usecocreate.io";
    // const apiUrl = "http://localhost:4000";
    const connectInstagramEndpoint = "/api/instagram/connect";
    const clientId = "026086c8-86fa-46d8-b34b-4e4f284450dc";
    // const clientId = "2d60698d-1711-4000-a580-6832e5ff0d48";
    const email = "ankush@usecocreate.io";
    // const email = "ankush@gessolabs.com";
    const redirectUrl = `${window.location.origin}/`;
    const queryPart = `client_id=${clientId}&session_verifier=instagram&redirect_url=${encodeURIComponent(
      redirectUrl
    )}&email=${email}`;

    const link = `${apiUrl}${connectInstagramEndpoint}?${queryPart}`;
    window.location.href = link;
  };

  return (
    <>
      <Head>
        <title>Co:Create Social Integrations Demo</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main>
        <VStack spacing={5} mt={75}>
          <Center>
            <Text fontSize='4xl'>Co:Create Social Integrations Demo</Text>
          </Center>
          <Box>
            <SocialButton
              username={twitterUsername}
              connectAction={connectTwitter}
              disconnectAction={disconnectTwitter}
              icon={<FaTwitter />}
              colorScheme='twitter'
              serviceName='Twitter'
            />
          </Box>

          <Box>
            <SocialButton
              username={discordUsername}
              connectAction={connectDiscord}
              disconnectAction={disconnectDiscord}
              icon={<FaDiscord />}
              colorScheme='purple'
              serviceName='Discord'
            />
          </Box>

          <Box>
            <SocialButton
              username={instagramUsername}
              connectAction={connectInstagram}
              disconnectAction={disconnectInstagram}
              icon={<FaInstagram />}
              colorScheme='pink'
              serviceName='Instagram'
            />
          </Box>

          {/* <Button
            _hover={{ bgColor: "gray.700" }}
            bgColor='#000000'
            color='white'
            leftIcon={<FaTiktok />}
          >
            Connect Your TikTok Account
          </Button> */}
        </VStack>
      </main>
    </>
  );
}
