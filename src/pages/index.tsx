import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { discord, twitter } from "@usecocreate/sdk";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaDiscord, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const { discord_username } = router.query;

  const [discordUsername, setDiscordUsername] = useState<null | string>(null);

  useEffect(() => {
    const storedDiscordUsername = localStorage.getItem("discord_username");
    if (storedDiscordUsername) {
      setDiscordUsername(storedDiscordUsername);
    }
  }, [discord_username]);

  useEffect(() => {
    if (discord_username) {
      const username = Array.isArray(discord_username)
        ? discord_username[0]
        : discord_username;
      localStorage.setItem("discord_username", username);
      setDiscordUsername(username);
      // clear query params from url
      router.push("/");
    }
  }, [discord_username, router]);

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

  const disconnectDiscord = () => {
    localStorage.removeItem("discord_username");
    setDiscordUsername(null);
  };

  const { twitter_username } = router.query;

  const [twitterUsername, setTwitterUsername] = useState<null | string>(null);

  useEffect(() => {
    const storedTwitterUsername = localStorage.getItem("twitter_username");
    if (storedTwitterUsername) {
      setTwitterUsername(storedTwitterUsername);
    }
  }, [twitter_username]);

  useEffect(() => {
    if (twitter_username) {
      const username = Array.isArray(twitter_username)
        ? twitter_username[0]
        : twitter_username;
      localStorage.setItem("twitter_username", username);
      setTwitterUsername(username);
      // clear query params from url
      router.push("/");
    }
  }, [twitter_username, router]);

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

  const disconnectTwitter = () => {
    localStorage.removeItem("twitter_username");
    setTwitterUsername(null);
  };

  const { instagram_username } = router.query;

  const [instagramUsername, setInstagramUsername] = useState<null | string>(
    null
  );

  useEffect(() => {
    const storedInstagramUsername = localStorage.getItem("instagram_username");
    if (storedInstagramUsername) {
      setInstagramUsername(storedInstagramUsername);
    }
  }, [instagram_username]);

  useEffect(() => {
    if (instagram_username) {
      const username = Array.isArray(instagram_username)
        ? instagram_username[0]
        : instagram_username;
      localStorage.setItem("instagram_username", username);
      setInstagramUsername(username);
      // clear query params from url
      router.push("/");
    }
  }, [instagram_username, router]);

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

  const disconnectInstagram = () => {
    localStorage.removeItem("instagram_username");
    setInstagramUsername(null);
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
            {twitterUsername ? (
              <Text as='span' fontSize='l'>
                Successfully connected Twitter Account:{" "}
                <Text as='span' fontWeight='bold'>
                  {twitterUsername}.
                </Text>
                {"   "}
                <Button
                  onClick={disconnectTwitter}
                  colorScheme='red'
                  variant='link'
                  textDecoration={"underline"}
                >
                  Disconnect
                </Button>
              </Text>
            ) : (
              <Button
                onClick={connectTwitter}
                leftIcon={<FaTwitter />}
                colorScheme='twitter'
              >
                Connect Your Twitter Account
              </Button>
            )}
          </Box>

          <Box>
            {discordUsername ? (
              <Text as='span' fontSize='l'>
                Successfully connected Discord Account:{" "}
                <Text as='span' fontWeight='bold'>
                  {discordUsername}.
                </Text>
                {"   "}
                <Button
                  onClick={disconnectDiscord}
                  colorScheme='red'
                  variant='link'
                  textDecoration={"underline"}
                >
                  Disconnect
                </Button>
              </Text>
            ) : (
              <Button
                onClick={connectDiscord}
                leftIcon={<FaDiscord />}
                colorScheme='purple'
              >
                Connect Your Discord Account
              </Button>
            )}
          </Box>

          <Box>
            {instagramUsername ? (
              <Text as='span' fontSize='l'>
                Successfully connected Instagram Account:{" "}
                <Text as='span' fontWeight='bold'>
                  {instagramUsername}.
                </Text>
                {"   "}
                <Button
                  onClick={disconnectInstagram}
                  colorScheme='red'
                  variant='link'
                  textDecoration={"underline"}
                >
                  Disconnect
                </Button>
              </Text>
            ) : (
              <Button
                onClick={connectInstagram}
                leftIcon={<FaInstagram />}
                colorScheme='pink'
              >
                Connect Your Instagram Account
              </Button>
            )}
          </Box>
          <Button
            _hover={{ bgColor: "gray.700" }}
            bgColor='#000000'
            color='white'
            leftIcon={<FaTiktok />}
          >
            Connect Your TikTok Account
          </Button>
        </VStack>
      </main>
    </>
  );
}
