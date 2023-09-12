import { Link } from "@chakra-ui/next-js";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
import { FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";
import { twitter } from "@usecocreate/sdk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
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
    }
  }, [twitter_username]);

  const connectTwitter = () => {
    const link = twitter.connectTwitterLink({
      clientId: "026086c8-86fa-46d8-b34b-4e4f284450dc",
      redirectUrl: "http://localhost:3000/",
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
  return (
    <>
      <Head>
        <title>Co:Create Social Integrations Demo</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main>
        <VStack spacing={5} mt={150}>
          <Text fontSize='4xl'>Co:Create Social Integrations Demo</Text>
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

          <Button leftIcon={<FaInstagram />} colorScheme='pink'>
            Connect Your Instagram Account
          </Button>
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
