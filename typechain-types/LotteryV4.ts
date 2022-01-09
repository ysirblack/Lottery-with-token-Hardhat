/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface LotteryV4Interface extends utils.Interface {
  functions: {
    "addTokenAddress(address)": FunctionFragment;
    "getRandomNumber()": FunctionFragment;
    "getWinners()": FunctionFragment;
    "howManyWillBePicked(uint256)": FunctionFragment;
    "lottery()": FunctionFragment;
    "owner()": FunctionFragment;
    "pickWinners()": FunctionFragment;
    "rastgele()": FunctionFragment;
    "rawFulfillRandomness(bytes32,uint256)": FunctionFragment;
    "register()": FunctionFragment;
    "registredPeople(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "reset()": FunctionFragment;
    "sendMoneyToWinners()": FunctionFragment;
    "setFee(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawLINK()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addTokenAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getRandomNumber",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getWinners",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "howManyWillBePicked",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "lottery", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pickWinners",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "rastgele", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rawFulfillRandomness",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "register", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registredPeople",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "reset", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sendMoneyToWinners",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawLINK",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "addTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRandomNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getWinners", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "howManyWillBePicked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lottery", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pickWinners",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rastgele", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rawFulfillRandomness",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registredPeople",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "reset", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sendMoneyToWinners",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawLINK",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "Random(uint256)": EventFragment;
    "TokenAddress(address)": EventFragment;
    "WhoRegistered(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Random"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenAddress"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WhoRegistered"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type RandomEvent = TypedEvent<[BigNumber], { randomNumber: BigNumber }>;

export type RandomEventFilter = TypedEventFilter<RandomEvent>;

export type TokenAddressEvent = TypedEvent<[string], { token: string }>;

export type TokenAddressEventFilter = TypedEventFilter<TokenAddressEvent>;

export type WhoRegisteredEvent = TypedEvent<[string], { person: string }>;

export type WhoRegisteredEventFilter = TypedEventFilter<WhoRegisteredEvent>;

export interface LotteryV4 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LotteryV4Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addTokenAddress(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getRandomNumber(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getWinners(overrides?: CallOverrides): Promise<[string[]]>;

    howManyWillBePicked(
      _number: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    lottery(
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber, BigNumber] & {
        lotteryStatus: number;
        toplamKisi: BigNumber;
        birikenPara: BigNumber;
        fee: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pickWinners(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rastgele(overrides?: CallOverrides): Promise<[BigNumber]>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    register(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    registredPeople(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    reset(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sendMoneyToWinners(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setFee(
      _fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawLINK(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addTokenAddress(
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getRandomNumber(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getWinners(overrides?: CallOverrides): Promise<string[]>;

  howManyWillBePicked(
    _number: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  lottery(
    overrides?: CallOverrides
  ): Promise<
    [number, BigNumber, BigNumber, BigNumber] & {
      lotteryStatus: number;
      toplamKisi: BigNumber;
      birikenPara: BigNumber;
      fee: BigNumber;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  pickWinners(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rastgele(overrides?: CallOverrides): Promise<BigNumber>;

  rawFulfillRandomness(
    requestId: BytesLike,
    randomness: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  register(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  registredPeople(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  reset(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sendMoneyToWinners(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setFee(
    _fee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawLINK(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addTokenAddress(_token: string, overrides?: CallOverrides): Promise<void>;

    getRandomNumber(overrides?: CallOverrides): Promise<string>;

    getWinners(overrides?: CallOverrides): Promise<string[]>;

    howManyWillBePicked(
      _number: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    lottery(
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber, BigNumber, BigNumber] & {
        lotteryStatus: number;
        toplamKisi: BigNumber;
        birikenPara: BigNumber;
        fee: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    pickWinners(overrides?: CallOverrides): Promise<void>;

    rastgele(overrides?: CallOverrides): Promise<BigNumber>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    register(overrides?: CallOverrides): Promise<boolean>;

    registredPeople(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    reset(overrides?: CallOverrides): Promise<void>;

    sendMoneyToWinners(overrides?: CallOverrides): Promise<void>;

    setFee(_fee: BigNumberish, overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawLINK(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Random(uint256)"(randomNumber?: null): RandomEventFilter;
    Random(randomNumber?: null): RandomEventFilter;

    "TokenAddress(address)"(token?: null): TokenAddressEventFilter;
    TokenAddress(token?: null): TokenAddressEventFilter;

    "WhoRegistered(address)"(person?: null): WhoRegisteredEventFilter;
    WhoRegistered(person?: null): WhoRegisteredEventFilter;
  };

  estimateGas: {
    addTokenAddress(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getRandomNumber(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getWinners(overrides?: CallOverrides): Promise<BigNumber>;

    howManyWillBePicked(
      _number: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    lottery(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pickWinners(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rastgele(overrides?: CallOverrides): Promise<BigNumber>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    register(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    registredPeople(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    reset(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sendMoneyToWinners(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setFee(
      _fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawLINK(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addTokenAddress(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getRandomNumber(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getWinners(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    howManyWillBePicked(
      _number: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    lottery(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pickWinners(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rastgele(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    register(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    registredPeople(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    reset(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sendMoneyToWinners(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setFee(
      _fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawLINK(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}