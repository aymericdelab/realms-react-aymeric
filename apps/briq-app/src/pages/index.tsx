import { Button } from '@bibliotheca-dao/ui-lib';
import Ethereum from '@bibliotheca-dao/ui-lib/icons/eth.svg';
import StarkNet from '@bibliotheca-dao/ui-lib/icons/starknet-logo.svg';
import { useStarknet } from '@starknet-react/core';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import CountdownTimer from '@/components/CountDown';
import { EntryCTA } from '@/components/EntryCTA';
import { FaqBlock } from '@/components/Faqs';
import { FooterBlock } from '@/components/FooterBlock';
import { Head } from '@/components/Head';
import { WithNavMenu } from '@/components/NavMenu';
import { ProjectBlock } from '@/components/ProjectBlock';
import { WonderBlock } from '@/components/WonderBlock';
import { wonders } from '@/data/Orders';
function Home() {
  const { account, error: starknetConnectionError } = useStarknet();

  const [content, setContent] = useState<string[]>([]);

  const time = () => {
    const END = 1651327190000;
    const NOW_IN_MS = new Date().getTime();
    const MS_UNTIL = END - NOW_IN_MS;

    return (NOW_IN_MS + MS_UNTIL).toString();
  };

  return (
    <div className="h-full bg-black">
      <Head />
      <div className="relative w-full bg-bottom bg-cover h-screen-30 bg-hero "></div>
      <div className="container flex flex-wrap mx-auto">
        <div className="w-full p-8 sm:w-1/2 sm:py-20">
          <h4>A starknet nft competition</h4>
          <h1>Build a Wonder & Win</h1>
          <p className="mt-8 font-display sm:text-2xl">
            Realms, Briq, PlayOasis & StarkWare present to you the first
            cross-project, on-chain, collaborative competition for builders and
            artists on StarkNet.
          </p>
        </div>
        <div className="self-center w-full p-10 text-center rounded sm:w-1/2 bg-gray-800/10">
          <h2>
            16 Winners <br /> 48k $LORDS <br />& 1.6 ETH in prizes
          </h2>
        </div>
      </div>
      <div className="flex w-full h-auto px-20 py-8 shadow-inner bg-off-200">
        <h4 className="mx-auto font-semibold uppercase">
          the lore, the builder, the marketplace, the roll-up
        </h4>
      </div>
      <div className="container flex flex-wrap py-20 mx-auto text-center">
        <ProjectBlock />
      </div>
      <iframe
        scrolling="no"
        src="https://realms.briq.construction/share?set_id=0x35ee90ec08fa17ab562a06406fc391f574e2a94805403b84000000000000000&network=testnet&version=2&embed=1"
        className="w-full h-screen-65"
        title="Briqs"
      ></iframe>
      <div className="container flex flex-wrap p-10 mx-auto sm:p-20">
        <div className="w-full sm:w-1/2">
          <div className="mb-20">
            <h4 className="mb-8">the competition</h4>
            <ol className="text-3xl list-decimal list-inside sm:text-5xl font-display">
              <li>Pick a Wonder</li>
              <li>Build and mint it with briqs</li>
              <li>Showcase it on PlayOasis</li>
            </ol>
          </div>
          <hr />
          <div className="my-20">
            <h4 className="mb-8">what is a wonder?</h4>
            <p className="mb-8 text-3xl sm:text-5xl font-display">
              Wonders are mythical structures, both man-made and naturally
              formed, scattered throughout the Realmverse.
            </p>
            <p className="sm:text-2xl">
              While they have been admired and worshipped for eons, their true
              beauty and image have never been transcribed to share with the
              wider world.{' '}
            </p>
          </div>
          <hr />
          <div className="my-20">
            <h4 className="mb-8">Calling all builders & artists</h4>
            <p className="mb-8 text-3xl sm:text-5xl font-display">
              We are calling on all builders, artists and layer 2 trailblazers
              to create their own visual representation of these sacred sites
              with briqs, directly on StarkNet.
            </p>
            <p className="sm:text-2xl">
              Of the 50 Wonders, there will be 16 to choose from to build: one
              from each of the Orders.
              <br />
              All creations will be displayed on PlayOasis in a special Realms
              category for all to see and worship.
            </p>
          </div>
          <hr />
          <div className="my-20">
            <h4 className="mb-8">Voting</h4>
            <p className="mb-8 text-3xl sm:text-5xl font-display">
              Submissions close on the 30th of April at midnight,then the 16
              winners will be chosen by Realm Holders via quadratic voting.
            </p>
            <p className="sm:text-2xl">
              There will be 16 separate snapshots to decide the winner from each
              of the Orders.
            </p>
          </div>
          <hr />
          <div className="my-20">
            <h4 className="mb-8">Prizes</h4>
            <p className="mb-8 text-3xl sm:text-5xl font-display">
              There is a total prize pool of 48k $LORDS and 1.6 ETH split evenly
              across the 16 winners.
            </p>
            <p className="mb-4 sm:text-2xl">
              Bibliotheca DAO will award 3000 $LORDS and StarkWare 0.1 eth to
              each of the winners. The winning NFTs will be minted on StarkNet
              mainnet and transferred to the winners free of cost. There are no
              prerequisites; everyone is welcome to participate.
            </p>
            <p className="sm:text-2xl">
              You can submit as many as you like and, if voted by the DAO, can
              win multiple across the different Wonders of the Orders.
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2 sm:px-12">
          <div className="sticky top-10">
            <h4>
              Time left in <br /> competition submission
            </h4>
            <CountdownTimer date={time()} />
            <EntryCTA />
          </div>
        </div>
      </div>
      <div className="flex w-full h-auto py-8 shadow-inner bg-off-200">
        <h4 className="mx-auto tracking-widest uppercase">how to enter</h4>
      </div>
      <div className="container justify-center mx-auto">
        <div className="self-start p-16 mx-auto sm:w-2/3">
          <ol className="space-y-4 text-xl leading-loose list-decimal list-inside sm:text-3xl font-display">
            <li>
              Connect your Argent X StarkNet Wallet <br />{' '}
              <span className="text-lg text-gray-700 sm:text-2xl">
                (create one{' '}
                <a
                  className="hover:underline"
                  href="https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb"
                >
                  here
                </a>{' '}
                if you don’t have one and install the browser extension)
              </span>
            </li>
            <li>
              Complete the form <br />{' '}
              <span className="text-lg text-gray-700 sm:text-2xl">
                {account ? (
                  <a
                    target={'_blank'}
                    href={`https://docs.google.com/forms/d/e/1FAIpQLSc66txDM8Ei3w83p3kLJL30VoBS6P7Xep4cIDVACZAbLY05mg/viewform?usp=pp_url&entry.2005620554=${account}`}
                    className=" hover:underline"
                    rel="noreferrer"
                  >
                    Sign up and & build
                  </a>
                ) : (
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="hover:underline"
                    href="https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb"
                  >
                    First download and install Argent
                  </a>
                )}
              </span>
            </li>
            <li>
              20k Briqs will be airdropped to your address (within 24 hours)
            </li>
            <li>
              Choose one of the{' '}
              <a className="underline" href="#wonders">
                16 Wonders
              </a>{' '}
            </li>
            <li>
              Head to{' '}
              <a
                className="hover:underline text-[#eb5600]"
                href="https://realms.briq.construction/"
              >
                briq
              </a>{' '}
            </li>
            <li>
              Build your chosen Wonder with briqs <br />
              <a
                className="text-lg text-gray-700 hover:underline sm:text-2xl"
                target={'_blank'}
                href="https://briqnft.notion.site/Help-center-4a4958337970483dbfc2c1184290b42f"
                rel="noreferrer"
              >
                (how to build guide)
              </a>{' '}
            </li>
            <li>Mint your masterpiece on briq (no fees)</li>
            <li>
              Tweet your masterpiece with the following text: <br />{' '}
              <div className="py-8">
                "I built the @lootrealms Wonder [NAME] with @briqNFT. We’re
                trailblazing the way to layer 2 #StarkNet @starkwareLTD. View it
                on @PlayOasisXYZ.”
              </div>
            </li>
            <li> View your entry on PlayOasis</li>
          </ol>
          <hr className="my-10" />
          <h3 className="my-4">Voting</h3>
          <ul>
            <li>
              Voting will be done via a quadratic snapshot vote by the Realm
              holders
            </li>
            <li>
              There will be a snapshot per 16 submissions (one from each Order)
            </li>
            <li>Voting will be open for 7 days</li>
          </ul>
          <h3 className="my-4">Conditions</h3>
          <ul>
            <li>Open to everyone</li>
            <li>Should you need more briqs send a DM to the team</li>
            <li>Unlimited entries</li>
            <li>One creator can win more than once with multiple entries</li>
          </ul>
        </div>
        <div className="flex justify-center w-full">
          <EntryCTA />
        </div>
      </div>
      <div id="wonders" className="flex justify-center">
        <div className="w-1/2 py-8 mt-20 text-center">
          <h1 className="mb-4">The Wonders</h1>
          <p className="sm:text-2xl">
            While they have been admired and worshipped for eons, their true
            beauty and image have never been transcribed to share with the wider
            world.{' '}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 px-2 sm:grid-cols-4">
        {wonders.map((a, index) => {
          return (
            <WonderBlock key={index} name={a.name} id={a.id} order={a.order} />
          );
        })}
      </div>
      <FaqBlock />
      <hr className="mt-10" />
      <FooterBlock />
      <div className="relative w-full bg-bottom bg-cover h-screen-30 bg-hero "></div>
    </div>
  );
}

export default Home;
