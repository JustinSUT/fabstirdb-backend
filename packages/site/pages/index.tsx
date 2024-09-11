import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
const Gun = require('gun');
const SEA = require('gun/sea');

import { Button } from '../src/ui-components/button';
import { Description, Label } from '../src/ui-components/fieldset';
import { Textarea } from '../src/ui-components/textarea';
import { Field as HeadlessField } from '@headlessui/react';
import { generateUsername } from 'unique-username-generator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  // TableHeader,
  TableRow,
} from '../src/ui-components/table';

import { MetamaskActions, MetaMaskContext } from '../src/hooks';
import Link from 'next/link';

import { v4 as uuidv4 } from 'uuid';

import { connectSnap, getSnap, saveState, loadState } from '../src/utils';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import BlockchainContext from '../state/BlockchainContext';
import {
  contractaddressescurrenciesstate,
  currenciesdecimalplaces,
  currencieslogourlstate,
  currencycontractaddressesstate,
} from '../src/atoms/currenciesAtom';
import {
  currentnftcategories,
  nftslideoverstate,
} from '../src/atoms/nftSlideOverAtom';

import useMintNestableNFT from '../src/blockchain/useMintNestableNFT';
import useParticleAuth from '../src/blockchain/useParticleAuth';
import { CreateUser, ParticleAuth } from '../types';
import useTranscodeVideo from '../src/hooks/useTranscodeVideo';
import { saveAs } from 'file-saver';
import { iswasmreadystate } from '../src/atoms/renderStateAtom';
import { getSmartAccountAddress } from '../src/blockchain/useAccountAbstractionPayment';
import { createEOAAccount, generatePassword } from '../src/utils/eoaUtils';
import { getUser } from '../src/GlobalOrbit';
import { useQueryClient } from '@tanstack/react-query';
import { getConnectedChainId } from '../src/utils/chainUtils';
import useMintNFT from '../src/blockchain/useMintNFT';
import useContractUtils from '../src/blockchain/useContractUtils';
import useCreateUser from '../src/hooks/useCreateUser';
import useNativeAuth from '../src/hooks/useNativeAuth';
import { currentnftmetadata } from '../src/atoms/nftSlideOverAtom';
import { badgecreateslideoverstate } from '../src/atoms/badgeDetailsSlideOverFunctions';
import { currentbadgecategories } from '../src/atoms/badgeSlideOverAtom';
import { getNFTAddressId, splitNFTAddressId } from '../src/utils/nftUtils';
import useNFTs, { fetchScopedNFTs } from '../src/hooks/useNFTs';
import { userpubstate } from '../src/atoms/userAtom';
import useDeleteNFT from '../src/hooks/useDeleteNFT';
import { userauthpubstate } from '../src/atoms/userAuthAtom';
import useNFTMedia from '../src/hooks/useNFTMedia';
import useUserProfile from '../src/hooks/useUserProfile';
import useDeleteNestableNFT from '../src/hooks/useDeleteNestableNFT';
import UserProfile from './profile';
import { useMintNestableERC1155NFT } from '../src/blockchain/useMintNestableERC1155NFT';
import { ThemeContext } from '../src/components/ThemeContext';
import Loader from '../src/components/Loader';
import { dbClient } from '../src/GlobalOrbit';

type Addresses = {
  [key: string]: any; // Replace `any` with the actual type of the values
};

const Index = () => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const [triggerEffect, setTriggerEffect] = useState(0);

  const [addresses, setAddresses] = useState<Addresses>({}); // initialize with an empty array of type string[]
  const [newAddresses, setNewAddresses] = useState<string>('');
  const [removeAddresses, setRemoveAddresses] = useState<string>('');
  const [importKeys, setImportKeys] = useState<string>('');
  const [exportKeys, setExportKeys] = useState<string>('');
  const [userData, setUserData] = useState<any | null>(null);
  const fileImportKeysRef = useRef<HTMLInputElement>(null);

  const [isWasmReady, setIsWasmReady] = useRecoilState(iswasmreadystate);

  const [openNFT, setOpenNFT] = useRecoilState(nftslideoverstate);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const user = getUser();
  const [getUserProfile] = useUserProfile();
  const { theme, setTheme } = useContext(ThemeContext);
  // Define a type for the hook's return value
  type UseTranscodeVideoS5Return = {
    transcodeVideo: (
      cid: string,
      isEncrypted: boolean,
      isGPU: boolean,
      transcodeVideo: any,
    ) => Promise<void>;
  };
  const { transcodeVideo } = useTranscodeVideo() as UseTranscodeVideoS5Return;

  const blockchainContext = useContext(BlockchainContext);
  const {
    smartAccountProvider,
    setSmartAccountProvider,
    smartAccount,
    setSmartAccount,
    connectedChainId,
    setConnectedChainId,
  } = blockchainContext;

  const { getIsERC721Address } = useMintNFT();

  const userPub = useRecoilValue(userpubstate);
  const nfts = useNFTs(userPub);

  const [currencyContractAddresses, setCurrencyContractAddresses] =
    useRecoilState(currencycontractaddressesstate);

  const [currenciesDecimalPlaces, setCurrenciesDecimalPlaces] = useRecoilState(
    currenciesdecimalplaces,
  );

  const [contractAddressesCurrencies, setContractAddressesCurrencies] =
    useRecoilState(contractaddressescurrenciesstate);

  const [currentNFT, setCurrentNFT] = useRecoilState(currentnftmetadata);
  const [currentNFTCategories, setCurrentNFTCategories] =
    useRecoilState(currentnftcategories);

  const setCurrentBadgeCategories = useSetRecoilState(currentbadgecategories);

  const [currenciesLogoUrl, setCurrenciesLogoUrl] = useRecoilState(
    currencieslogourlstate,
  );

  const [smartAccountAddress, setSmartAccountAddress] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<any>(undefined);

  const [transak, setTransak] = useState<any>(undefined);

  const { socialLogin, logout } = useParticleAuth() as ParticleAuth;
  const { createUser, signOut, isUserExists, login } =
    useCreateUser() as CreateUser;

  const [userName, setUserName] = useState<string>('');
  const [userSession, setUserSession] = useState(null);

  const [errorsAddAddresses, setErrorsAddAddresses] = useState<string>('');
  const [errorsRemoveAddresses, setErrorsRemoveAddresses] =
    useState<string>('');
  const [errorsImportKeys, setErrorsImportKeys] = useState<string>('');
  const [errorsExportKeys, setErrorsExportKeys] = useState<string>('');
  const {
    getCurrencyContractAddresses,
    getCurrencyDecimalPlaces,
    getContractAddressesCurrencies,
  } = useContractUtils();

  const { unlockVideoFromController, unlockNestableKeysFromController } =
    useNFTMedia();

  const userAuthPub = useRecoilValue(userauthpubstate);
  const { mutate: deleteNFT, ...deleteNFTInfo } = useDeleteNFT(userAuthPub);

  const mintNestableNFT = useMintNestableNFT();
  if (!mintNestableNFT) throw new Error('mintNestableNFT is undefined');

  const { getIsNestableNFT, getChildrenOfNestableNFT } = useMintNestableNFT();
  const {
    getIsNestableNFT: getIsNestableERC1155NFT,
    getChildrenOfNestableNFT: getChildrenOfNestableERC1155NFT,
  } = useMintNestableERC1155NFT();

  const { loginNative } = useNativeAuth();
  const { deleteNestableNFT } = useDeleteNestableNFT();

  useEffect(() => {
    // Ensure this code runs only on the client side
    // if (typeof window !== 'undefined') {
    const session = sessionStorage.getItem('userSession');
    if (session) {
      setUserData(JSON.parse(session));
    }
    // }
  }, []);

  useEffect(() => {
    // Update the context value
    const setSmartAccountAddressFn = async () => {
      if (smartAccount)
        setSmartAccountAddress(await getSmartAccountAddress(smartAccount));
    };
    setSmartAccountAddressFn();
  }, [smartAccount]);

  useEffect(() => {
    const theCurrentBadgeCategories = [
      'access pass',
      'award',
      'certificate',
      'community',
      'contribution',
      'identity',
      'legal',
      'license',
      'membership',
      'other',
      'proof of attendance',
      'skill',
      'voting',
    ];
    setCurrentBadgeCategories(theCurrentBadgeCategories);

    const theCurrentNFTCategories = [
      'artwork',
      'achievement',
      'certificate',
      'chat',
      'content',
      'financial',
      'identity',
      'in-game',
      'legal',
      'ownership',
      'other',
      'intellectual property',
      'real estate',
      'rights',
      'service',
      'ticket',
    ];
    setCurrentNFTCategories(theCurrentNFTCategories);

    setCurrenciesLogoUrl({
      USDC: 'assets/coins/usd-coin-stablecoin-logo.svg',
      DAI: 'assets/coins/multi-collateral-dai-dai-logo.svg',
      MATIC: 'assets/coins/polygon-matic-logo.svg',
      STIR: 'assets/coins/fabstir_logo_official.png',
    });

    const theCurrencyContractAddresses = getCurrencyContractAddresses();
    setCurrencyContractAddresses(theCurrencyContractAddresses);

    const theContractAddressesCurrencies = getContractAddressesCurrencies();
    setContractAddressesCurrencies(theContractAddressesCurrencies);

    const theCurrencyDecimalPlaces = getCurrencyDecimalPlaces();
    setCurrenciesDecimalPlaces(theCurrencyDecimalPlaces);
  }, [process.env]);

  useEffect(() => {
    (async () => {
      if (userAuthPub) {
        const userAuthProfile = await getUserProfile(userAuthPub);
        setUserName(userAuthProfile?.userName);
      } else {
        setUserName('');
      }
    })();
  }, [userAuthPub]);

  useEffect(() => {
    setIsDisabled(!(smartAccount && connectedChainId));
  }, [smartAccount, connectedChainId]);

  useEffect(() => {
    /**
     * Handles adding a new address to the list of addresses.
     * If the NFT is a video, it ingests and transcodes it.
     */
    const handleAddAddresses = async () => {
      const { providers } = blockchainContext;
      const addresses = await loadAddresses();

      if (!providers || Object.keys(providers).length === 0 || !smartAccount) {
        // Handle the case when provider or smartAccount is not available
        console.error('Provider or smartAccount is undefined');
        setErrorsAddAddresses('Not logged in.');
        return;
      }

      if (!newAddresses) return;

      // Define a type for the hook's return value
      const addressesList = newAddresses.split('\n');

      const updatedAddresses: Addresses = { ...addresses };

      for (const anAddress of addressesList) {
        const [addressId, encryptionKey] = anAddress.split(',');
        const [address, id] = addressId.split('_');

        let nftJSON = {};

        if (await getIsERC721Address(address)) {
          const isNestable = await getIsNestableNFT(address);
          if (!isNestable) {
            await unlockVideoFromController(userAuthPub, address, id);
          } else {
            let nft = { address, id, isNestable: true };

            await unlockNestableKeysFromController(
              userAuthPub,
              nft,
              getIsNestableNFT,
              getChildrenOfNestableNFT,
            );
          }
        } else {
          const isNestable = await getIsNestableERC1155NFT(address);
          if (!isNestable) {
            await unlockVideoFromController(userAuthPub, address, id);
          } else {
            let nft = { address, id, isNestable: true, multiToken: true };

            await unlockNestableKeysFromController(
              userAuthPub,
              nft,
              getIsNestableERC1155NFT,
              getChildrenOfNestableERC1155NFT,
            );
          }
        }
        updatedAddresses[addressId as string] = nftJSON;
      }

      setAddresses(updatedAddresses);

      if (process.env.NEXT_PUBLIC_IS_USE_FABSTIRDB === 'false')
        await saveState(updatedAddresses);

      setNewAddresses('');
    };
    if (triggerEffect > 0) {
      // Or check if the flag is true, if using a boolean
      handleAddAddresses();
    }
  }, [triggerEffect]);

  /**
   * Handles removing an address from the list of addresses.
   * Deletes the address from the saved state and updates the addresses state.
   */
  const handleRemoveAddresses = async () => {
    if (!smartAccount) {
      // Handle the case when provider or smartAccount is not available
      console.error('Provider or smartAccount is undefined');
      setErrorsRemoveAddresses('Not logged in.');
      return;
    }

    if (!removeAddresses) return;

    const addresses = await loadAddresses();

    const newAddresses: Addresses = { ...addresses };

    const addressesList = removeAddresses.split('\n');

    for (const address of addressesList) {
      if (address in newAddresses) {
        if (process.env.NEXT_PUBLIC_IS_USE_FABSTIRDB === 'true') {
          const { address: theAddress, id } = splitNFTAddressId(address);

          const isNestable = await getIsNestableNFT(theAddress);
          if (!isNestable) {
            deleteNFT({ address: theAddress, id });
          } else {
            await deleteNestableNFT({ address: theAddress, id });
          }
        }
        delete newAddresses[address];
      }
    }

    setAddresses(newAddresses);

    if (process.env.NEXT_PUBLIC_IS_USE_FABSTIRDB !== 'true')
      await saveState(newAddresses);

    setRemoveAddresses('');
    setCurrentNFT(null);
  };

  const handleButtonImportKeys = () => {
    if (!smartAccount) {
      // Handle the case when provider or smartAccount is not available
      console.error('Provider or smartAccount is undefined');
      setErrorsImportKeys('Not logged in.');
      return;
    }

    // Trigger the file input click event
    if (!fileImportKeysRef.current) return;

    fileImportKeysRef.current.click();
  };

  const handleImportKeys = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!smartAccount) {
      // Handle the case when provider or smartAccount is not available
      console.error('Provider or smartAccount is undefined');
      setErrorsImportKeys('Not logged in.');
      return;
    }

    if (!event.target.files?.length) return;

    if (!fileImportKeysRef.current || !event.target.files) return;

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target?.result as string;

      try {
        const newAddresses = JSON.parse(contents);

        const updatedAddresses = { ...addresses };

        for (const key in newAddresses) {
          if (!importKeys || importKeys.includes(key)) {
            updatedAddresses[key] = newAddresses[key];
          }
        }

        setAddresses(updatedAddresses);
        const handleSaveState = async () => {
          await saveState(updatedAddresses);
        };

        handleSaveState();
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };

    reader.readAsText(file);
    setImportKeys('');
  };

  const handleExportKeys = async () => {
    if (!smartAccount) {
      // Handle the case when provider or smartAccount is not available
      console.error('Provider or smartAccount is undefined');
      setErrorsExportKeys('Not logged in.');
      return;
    }

    const addresses = await loadAddresses();

    let result: { [key: string]: any } = {}; // Declare result as an object with string keys and values of any type

    const exportKeysSplit = exportKeys.split('\n');
    for (let key of exportKeysSplit) {
      // Iterate over exportKeys
      if (key in addresses) {
        result[key] = addresses[key]; // If key is in addresses, add it to result
      }
    }

    const json = JSON.stringify(result); // Stringify result, not exportKeys
    const blob = new Blob([json], { type: 'application/json' });

    const uniqueString = uuidv4().replace(/-/g, ''); // Generate a unique string and remove dashes

    saveAs(blob, `mp_addresses_keys_${uniqueString}.json`);
    setExportKeys('');
  };

  const loadAddresses = async () => {
    if (process.env.NEXT_PUBLIC_IS_USE_FABSTIRDB === 'true') {
      // const nftAddresses = nfts?.data?.reduce(
      //   (acc: { [key: string]: {} }, nft: any) => {
      //     const addressId = getNFTAddressId(nft);
      //     acc[addressId] = {};
      //     return acc;
      //   },
      //   {},
      // );
      const userProfile = await getUserProfile(userPub);
      const nfts = await fetchScopedNFTs(userPub, userProfile);
      const nftAddresses = nfts?.reduce(
        (acc: { [key: string]: {} }, nft: any) => {
          if (nft.parentId === undefined) {
            // Only proceed if nft.parentId is not defined
            const addressId = getNFTAddressId(nft);
            acc[addressId] = {};
          }
          return acc;
        },
        {},
      );

      setAddresses(nftAddresses || {});
      return nftAddresses || {};
    } else {
      type Addresses = {
        state?: any; // Replace `any` with the actual type of `state`
        // Define other properties of `state.addresses` here
      };

      const state: { addresses: Addresses } =
        (await loadState()) as unknown as {
          addresses: Addresses;
        };

      setAddresses(state.addresses.state);

      return state.addresses.state;
    }
  };

  /**
   * Handles loading the saved state of addresses.
   * Sets the addresses state to the saved state.
   */
  const handleLoadAddresses = async () => {
    const addresses = await loadAddresses();
    setAddresses(addresses);
  };

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (error) {
      dispatch({
        type: MetamaskActions.SetError,
        payload: error,
      });
    }
  };

  const loginFabstirDB = async (
    smartAccountAddress: string,
    eoaAddress: string,
  ) => {
    if (!process.env.NEXT_PUBLIC_FABSTIR_SALT_PAIR)
      throw new Error('logInOrCreateNewUser: Salt pair is not set');

    const password = generatePassword(
      smartAccountAddress,
      process.env.NEXT_PUBLIC_FABSTIR_SALT_KEY as string,
    );

    const pair = JSON.parse(process.env.NEXT_PUBLIC_FABSTIR_SALT_PAIR);

    const username = await SEA.work(smartAccountAddress, pair);
    const passw = await SEA.work(password, pair);

    const testUserName = `${username}_${process.env.NEXT_PUBLIC_FABSTIR_MEDIA_PLAYER_INSTANCE}`;
    const testPassword = `${passw}_${process.env.NEXT_PUBLIC_FABSTIR_MEDIA_PLAYER_INSTANCE}`;

    let loggedIn = false;
    if (await isUserExists(testUserName)) {
      console.log('logInOrCreateNewUser: isUserExists(userInfo.uuid) in if');
      loggedIn = await login(testUserName, testPassword);
    } else {
      console.log('logInOrCreateNewUser: isUserExists(userInfo.uuid) in else');

      const publicUsername = generateUsername('', 0, 15);

      const userProfile = {
        userName: publicUsername,
        accountAddress: smartAccountAddress,
        eoaAddress,
      };

      loggedIn = await createUser(testUserName, testPassword, userProfile);
    }
    if (!loggedIn) throw new Error('logInOrCreateNewUser: login failed');
  };

  const handleLogin = async () => {
    try {
      let userAccountAddress = null;
      let eoaAddress = '';

      if (process.env.NEXT_PUBLIC_ENABLE_OTHER_WALLET !== 'true') {
        const {
          smartAccount: biconomySmartAccount,
          web3Provider,
          userInfo,
          eoaAddress: eoaAddress1,
        } = await socialLogin();

        eoaAddress = eoaAddress1;

        if (!(biconomySmartAccount && web3Provider))
          throw new Error('index: connect: login failed');

        userAccountAddress = await getSmartAccountAddress(biconomySmartAccount);
        setSmartAccount(biconomySmartAccount);
        setSmartAccountProvider(web3Provider);

        const chainId = await getConnectedChainId(biconomySmartAccount);
        setConnectedChainId(chainId);
        setUserInfo(userInfo);
        setLoading(false);

        setErrorsAddAddresses('');
        setErrorsRemoveAddresses('');
        setErrorsImportKeys('');
        setErrorsExportKeys('');
      } else if (!(smartAccount && smartAccountProvider)) {
        userAccountAddress = await loginNative();
        eoaAddress = userAccountAddress;
        setSmartAccountAddress(userAccountAddress);
      }
      fetchColor();
      await loginFabstirDB(userAccountAddress, eoaAddress);
    } catch (e) {
      const errorMessage = 'index: connect: error received';
      console.error(`${errorMessage} ${e.message}`);
      console.log('wwww', e);
      throw new Error(errorMessage, e);
    }
  };

  async function handleLogout() {
    await signOut();
    setSmartAccount(null);
    setConnectedChainId(null);
    setDefaultColors();
  }

  // Define the props type for ButtonLink
  type ButtonLinkProps = {
    href: string;
    label: string;
    isDisabled: boolean;
    className?: string;
    color?: string; // Optional prop for additional classes
  };
  // ButtonLink Component with TypeScript
  const ButtonLink: React.FC<ButtonLinkProps> = ({
    href,
    label,
    isDisabled,
    className,
    color,
  }) => {
    return isDisabled ? (
      <div className={className}>
        <Button
          variant=""
          size="medium"
          className="p-1 text-2xl font-semibold "
          disabled={true}
          style={{ backgroundColor: color }}
        >
          <p className="text-lg p-1 font-bold">{label}</p>
        </Button>
      </div>
    ) : (
      <Link href={href} className={className}>
        <Button
          variant=""
          size="medium"
          className="p-1 text-2xl font-semibold "
          disabled={false}
          style={{ backgroundColor: color }}
        >
          <p className="text-lg p-1 font-bold">{label}</p>
        </Button>
      </Link>
    );
  };

  async function getColor(smartAccount:any) {
    try {
      const path = `color/${encodeURIComponent(smartAccount)}`;

      const result = await dbClient.get(path).once();
      console.log('Raw OrbitDB result:', result);

      if (!result) {
        console.error('No data found for this smart account');
        return null;
      }

      if (typeof result === 'object' && result.err) {
        console.error('Error from OrbitDB:', result.err);
        return null;
      }

      return result;
    } catch (error) {
      console.error('Error querying OrbitDB:', error);
      return null;
    }
  }

  const fetchColor = async () => {
    try {
      if (!smartAccountAddress) return;
      getColor(smartAccountAddress).then((color: any) => {
        if (color) {
          console.log('Color retrieved:', color);
          if (!color) {
            setDefaultColors();
          }
          const {
            primaryColor,
            secondaryColor,
            utilityColors,
            neutralsColor,
            saturationNumber,
          } = color.data ?? {};

          // Function to set CSS variables
          const setCSSVariables = (colorObj: any, prefix = '') => {
            console.log('colorObj', colorObj);
            if (!colorObj) return;

            Object.keys(colorObj).forEach((key) => {
              const cssVariableName = `--${prefix}${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
              const cssValue = colorObj[key];
              console.log(cssVariableName, '----', cssValue);
              // Set the CSS variable dynamically
              document.documentElement.style.setProperty(
                cssVariableName,
                cssValue,
              );
            });
          };
          console.log('primaryColor', primaryColor);
          // Set CSS variables for colors
          setCSSVariables(primaryColor, '');
          setCSSVariables(secondaryColor, '');
          setCSSVariables(utilityColors, '');
          setCSSVariables(neutralsColor?.light, 'light-');
          setCSSVariables(neutralsColor?.dark, 'dark-');
        } else {
          console.log('Failed to retrieve color');
        }
      });
    } catch (error) {
      console.log('error:', error);
      setDefaultColors(); // Set default colors in case of an error
    } finally {
      setLoader(false);
    }
  };

  const setDefaultColors = () => {
    const defaultColors = {
      light: {
        '--primary-color': '#4699eb',
        '--primary-content-color': '#05192d',
        '--primary-dark-color': '#1980e5',
        '--primary-light-color': '#74b2f0',

        '--secondary-color': '#eb9846',
        '--secondary-content-color': '#2d1905',
        '--secondary-dark-color': '#e57e19',
        '--secondary-light-color': '#f0b274',

        '--success-color': '#46eb46',
        '--success-content-color': '#052d05',

        '--warning-color': '#ebeb46',
        '--warning-content-color': '#2d2d05',

        '--error-color': '#eb4646',
        '--error-content-color': '#ffffff',

        '--light-foreground': '#fafbfd',
        '--light-background': '#eaf0f5',
        '--light-border': '#d4dfea',

        '--light-copy': '#192634',
        '--light-copy-light': '#42668a',
        '--light-copy-lighter': '#648cb4',
      },
      dark: {
        '--primary-color': '#4699eb',
        '--primary-content-color': '#05192d',
        '--primary-dark-color': '#1980e5',
        '--primary-light-color': '#74b2f0',

        '--secondary-color': '#eb9846',
        '--secondary-content-color': '#2d1905',
        '--secondary-dark-color': '#e57e19',
        '--secondary-light-color': '#f0b274',

        '--success-color': '#46eb46',
        '--success-content-color': '#052d05',

        '--warning-color': '#ebeb46',
        '--warning-content-color': '#2d2d05',

        '--error-color': '#eb4646',
        '--error-content-color': '#ffffff',

        '--dark-foreground': '#192634',
        '--dark-background': '#111a22',
        '--dark-border': '#294056',

        '--dark-copy': '#fafbfd',
        '--dark-copy-light': '#cbd9e6',
        '--dark-copy-lighter': '#87a6c5',
      },
    };

    // Set light mode colors
    Object.entries(defaultColors.light).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value as string);
    });

    // Set dark mode colors
    Object.entries(defaultColors.dark).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value as string);
    });
  };

  useEffect(() => {
    if (smartAccountAddress) {
      fetchColor();
    } else {
      setDefaultColors();
    }
  }, [smartAccountAddress]);
  return (
    <div className="p-4 max-w-6xl mx-auto bg-background  dark:bg-dark-background text-copy dark:text-dark-copy">
      <h1 className="uppercase text-2xl font-bold mb-5">Web3 Media Player</h1>

      {userName && smartAccount && (
        <h2 className="text-xl  font-semibold mb-7">User: {userName}</h2>
      )}

      {!state.installedSnap && (
        <Button
          size="medium"
          onClick={handleConnectClick}
          className="p-1 h-8 col-span-1 mb-2 "
        >
          Connect Snap
        </Button>
      )}
      <br />
      {!loading && !smartAccount && (
        <Button
          onClick={handleLogin}
          variant=""
          size="medium"
          className="mt-4 text-xl font-semibold "
        >
          Log in
        </Button>
      )}
      <br />
      {/* <button onClick={mintNFT} className="">
        Mint NFT
      </button> */}
      {loading && <p>Loading Smart Account...</p>}
      {smartAccount && (
        <h2 className="">Smart Account: {smartAccountAddress}</h2>
      )}
      {smartAccount && (
        <Button
          onClick={handleLogout}
          variant=""
          size="medium"
          className="mt-2 mb-6 "
        >
          Log out
        </Button>
      )}
      <br />

      {/* Area to view gallery NFTs that a user owns, to mint and play them */}
      <div className="flex flex-row">
        <ButtonLink
          href="/gallery/userNFTs"
          label="Gallery"
          isDisabled={isDisabled}
          className=" "
        />
        <ButtonLink
          href="/profile"
          label="Profile"
          isDisabled={isDisabled}
          className="ml-4 "
        />
        <ButtonLink
          href="/permissions"
          label="Permissions"
          isDisabled={isDisabled}
          className="ml-4 "
        />
        <ButtonLink
          href="/color-customization"
          label="Color Customization"
          isDisabled={isDisabled}
          className="ml-4 "
        />
      </div>

      {/* <h1 className="mt-7 mb-4">List of Addresses</h1>{' '} */}

      <div className="mt-6 mb-10">
        <Button
          variant=""
          size="medium"
          className="text-xl mt-4 "
          disabled={isDisabled}
          onClick={handleLoadAddresses}
        >
          Display Addresses
        </Button>

        {addresses && (
          <>
            {Object.keys(addresses)?.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell header={true}>Address Id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(addresses).map((address) => (
                    <TableRow key={address}>
                      <TableCell className="font-medium">{address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </>
        )}
      </div>
      {/* Replaced Heading with h1 */}
      <div className="grid grid-cols-12">
        <p className="col-span-12 ml-4 mb-2 ">
          Enter address ids as contract address and token id separated by `_`
        </p>
        <HeadlessField className="grid grid-cols-12 gap-6 p-4 border-2 border-gray-200 col-span-11">
          <div className="col-span-5">
            <Description className="mt-1 ">
              Enter address ids to add to the gallery.
            </Description>
          </div>
          <div className="col-span-7">
            <Textarea
              name="addAddressses"
              className="rounded-md"
              value={newAddresses}
              onChange={(e) => setNewAddresses(e.target.value)}
              placeholder="Enter address ids"
              disabled={isDisabled}
            />
          </div>
        </HeadlessField>

        <Button
          variant=""
          size="medium"
          className="p-1 h-8 m-4 col-span-1 "
          onClick={() => setTriggerEffect((prev) => prev + 1)}
          disabled={isDisabled}
        >
          Add
        </Button>
        <p className=" text-red-600 pb-2">{errorsAddAddresses}</p>
        <HeadlessField className="grid grid-cols-12 gap-6 p-4 border-2 border-gray-200 col-span-11 col-start-1">
          <div className="col-span-5">
            <Description className="mt-1 ">
              Enter address ids to remove from the gallery.
            </Description>
          </div>
          <div className="col-span-7">
            <Textarea
              name="removeAddresses"
              className="rounded-md"
              value={removeAddresses}
              onChange={(e) => setRemoveAddresses(e.target.value)}
              placeholder="Enter address ids"
              disabled={isDisabled}
            />
          </div>
        </HeadlessField>

        <Button
          variant=""
          size="medium"
          className="p-1 h-8 m-4 col-span-1 "
          onClick={handleRemoveAddresses}
          disabled={isDisabled}
        >
          Remove
        </Button>
        <p className=" text-red-600 pb-2">{errorsRemoveAddresses}</p>
        <HeadlessField className="grid grid-cols-12 gap-6 p-4 border-2 border-gray-200 col-span-11 col-start-1">
          <div className="col-span-5">
            <Description className="mt-1 ">
              Enter address ids to export to a new keys file.
            </Description>
          </div>
          <div className="col-span-7">
            <Textarea
              name="exportKeys"
              className="rounded-md"
              value={exportKeys}
              onChange={(e) => setExportKeys(e.target.value)}
              placeholder="Enter address ids"
              disabled={isDisabled}
            />
          </div>
        </HeadlessField>

        <Button
          variant=""
          size="medium"
          className="p-1 h-8 m-4 col-span-1 "
          onClick={handleExportKeys}
          disabled={isDisabled}
        >
          Export
        </Button>
        <p className=" text-red-600 pb-2">{errorsExportKeys}</p>

        <HeadlessField className="grid grid-cols-12 gap-6 p-4 border-2 border-gray-200 col-span-11 col-start-1">
          <div className="col-span-5">
            <Description className="mt-1 ">
              Browse to keys file to import. To import subset, enter address
              ids. Leave blank to import all keys.
            </Description>
          </div>
          <div className="col-span-7">
            <Textarea
              name="importKeys"
              className="rounded-md"
              value={importKeys}
              onChange={(e) => setImportKeys(e.target.value)}
              placeholder="Enter address ids"
              disabled={isDisabled}
            />
          </div>
        </HeadlessField>

        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileImportKeysRef}
          onChange={handleImportKeys}
          accept=".json"
        />
        <Button
          variant=""
          size="medium"
          className="p-1 h-8 m-4 col-span-1 "
          onClick={handleButtonImportKeys}
          disabled={isDisabled}
        >
          Import
        </Button>
        <p className=" text-red-600 pb-2">{errorsImportKeys}</p>
      </div>
    </div>
  );
};

export default Index;
