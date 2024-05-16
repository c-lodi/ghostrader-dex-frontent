import React, { useState, useEffect } from "react";
import ArrowIcon from "../assets/arrow-down.svg"
import SwapIcon from "../assets/swap.svg"
import axios from "axios";
import tokenList from "../tokenList.json";


import { Button, Modal } from "flowbite-react";
import { useSendTransaction, useWaitForTransaction } from "wagmi";


function Swap(props, tokenProps) {
    // const tokenList = tokenProps.tokens

    // modals
    const [isTokensModalOpen, setIsTokensModalOpen] = useState(false);
    const [isSlippageOpen, setIsSlippageOpen] = useState(false);

    const { address, isConnected } = props;
    const [slippage, setSlippage] = useState(2.5);

    const [tokenOneAmount, setTokenOneAmount] = useState("");
    const [tokenTwoAmount, setTokenTwoAmount] = useState("");
    const [tokenOne, setTokenOne] = useState(tokenList[0]);
    const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
    const [changeToken, setChangeToken] = useState(1);
    const [prices, setPrices] = useState(null);

    const [txDetails, setTxDetails] = useState({
        to: null,
        data: null,
        value: null,
    });

    const { data, sendTransaction } = useSendTransaction({
        request: {
            from: address,
            to: String(txDetails.to),
            data: String(txDetails.data),
            value: String(txDetails.value),
        }
    })

    function openTokensModal(asset) {
        setChangeToken(asset)
        setIsTokensModalOpen(true)
    }

    function openSlippageModal() {
        setIsSlippageOpen(true)
        console.log(slippage)
    }

    function modifyToken(i) {
        setPrices(null)
        setTokenOneAmount("")
        setTokenTwoAmount("")

        if (changeToken === 1) {
            setTokenOne(tokenList[i])
            fetchPrices(tokenList[i].address, tokenTwo.address)

        } else {
            setTokenTwo(tokenList[i])
            fetchPrices(tokenOne.address, tokenList[i].address)
        }
        setIsTokensModalOpen(false);
    }


    function changeAmount(e) {
        setTokenOneAmount(e.target.value);
        if (e.target.value && prices) {
            setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2))
        } else {
            setTokenTwoAmount("")
        }
    }

    function switchToken() {
        setPrices(null)
        setTokenOneAmount("")
        setTokenTwoAmount("")
        const one = tokenOne;
        const two = tokenTwo;
        setTokenOne(two)
        setTokenTwo(one)
        fetchPrices(two.address, one.address)
    }

    function handleSlippageChange(e, i) {
        setSlippage(i)
        setIsSlippageOpen(false)
        console.log(slippage)
    }



    // API calls function

    async function fetchDexAllowance() {
        const url = "http://localhost:3001/allowance";
        const config = {
            params: {
                "tokenAddress": tokenOne.address,
                "walletAddress": address,
            }
        };

        const response = await axios.get(url, config);

        if (response.data.allowance === "0") {
            console.log("fetchDexAllowance---", response.data)
            setTimeout(fetchDexApproveTransaction, 1000);
            setTxDetails(response.data)
            return
        }
    }

    async function fetchDexApproveTransaction() {
        const url = "http://localhost:3001/approveTransaction";
        const config = {
            params: {
                "tokenAddress": tokenOne.address
            }
        }
        try {
            const response = await axios.get(url, config);
            setTxDetails(response.data)
            console.log("fetchDexApproveTransaction---", response.data)
            setTimeout(callMakeSwap, 1000)

        } catch (error) {
            console.log(error)
        }
    }


    async function callMakeSwap() {

        const url = "http://localhost:3001/makeSwap";
        const config = {
            params: {
                "src": tokenOne.address,
                "dst": tokenTwo.address,
                "amount": tokenOneAmount.padEnd(tokenOne.decimals + tokenOneAmount.length, '0'),
                "from": address,
                "slippage": slippage
            }
        };

        const response = await axios.get(url, config);
        let decimals = Number(`1E${tokenTwo.decimals}`)
        setTokenTwoAmount((Number(response.data.toTokenAmount) / decimals).toFixed(2));
        setTxDetails(response.data.tx)
    }

    async function fetchPrices(one, two) {
        const res = await axios.get(`http://localhost:3001/tokenPrice`, {
            params: { addressOne: one, addressTwo: two }
        })
        setPrices(res.data)
    }


    useEffect(() => {
        fetchPrices(tokenList[0].address, tokenList[1].address)
    }, [])


    useEffect(() => {
        if (txDetails.to && isConnected) {
            sendTransaction();
        }
    }, [txDetails])

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gun-metal-900">

                {/* Modal */}
                <Modal show={isTokensModalOpen} onClose={() => setIsTokensModalOpen(false)} size="lg">
                    <Modal.Header className="bg-gun-metal-700 border-b border-none">
                        <div className="blue-gray">Token Selection</div>
                    </Modal.Header>
                    <Modal.Body className="bg-gun-metal-700 border-t border-none ">
                        <div className="flow-root text-white">
                            <ul className="divide-y divide-gray-700 dark:divide-gray-700 text-white">
                                {tokenList?.map((e, i) => {
                                    return (
                                        <li className="p-3 sm:py-4 hover:bg-gun-metal-800 rounded-lg"
                                            key={i}
                                            onClick={() => modifyToken(i)}>
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={e.img} alt="" />
                                                </div>
                                                <div className="flex-1 min-w-0 ms-4">
                                                    <p className="text-sm font-medium text-white-900 truncate dark:text-white">
                                                        {e.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        {e.ticker}
                                                    </p>
                                                </div>


                                                <div className="inline-flex items-center text-base text-xs font-semibold text-blue-gray bg-sand-yellow-800 px-5 py-1 rounded-lg">
                                                    <a target="_blank" without rel="noreferrer" href={`https://etherscan.io/address/${e.address}`} className="flex items-center">
                                                        <span>{e.address.slice(0, 4) + "..." + e.address.slice(38)}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="ml-1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M14.7731 9.22687L9 15M14.7731 9.22687C14.2678 8.72156 11.8846 9.21665 11.1649 9.22687M14.7731 9.22687C15.2784 9.73219 14.7834 12.1154 14.7731 12.8351" />
                                                            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" />
                                                        </svg>
                                                    </a>
                                                </div>

                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </Modal.Body>
                </Modal>


                <Modal show={isSlippageOpen} onClose={() => setIsSlippageOpen(false)} size="lg">
                    <Modal.Header className="bg-gun-metal-700 border-b border-none">
                        <div className="blue-gray">Select Slippage</div>
                    </Modal.Header>
                    <Modal.Body className="flex items-center  bg-gun-metal-700 border-t border-none pb-10 ">
                        <div className="flex flex-1 justify-evenly gap-2">

                            <Button.Group outline>
                                <Button className="px-6 py-2 bg-gun-metal-800 border-gray-500 hover:bg-black" type="submit" onClick={(e) => handleSlippageChange(e, 0.5)}>0.5 %</Button>
                                <Button className="px-6 py-2 bg-gun-metal-800 border-gray-500" type="submit" onClick={(e) => handleSlippageChange(e, 2.5)}>2.5 %</Button>
                                <Button className="px-6 py-2 bg-gun-metal-800 border-gray-500" type="submit" onClick={(e) => handleSlippageChange(e, 5.0)}>5.0 %</Button>
                            </Button.Group>
                        </div>
                    </Modal.Body>
                </Modal>

                {/* modal  */}


                <div className="bg-gun-metal-700 p-4 shadow-swap2-dark rounded-2xl">
                    <form>
                        <div className="flex lg:gap-x-12 justify-between p-2 mt-2 px-2 rounded-xl">
                            <div>
                                <p className="text-sm blue-gray font-bold">You Pay:</p>
                            </div>

                            <div className="ml-auto" onClick={() => openSlippageModal()}>
                                <div className="flex items-center">
                                    <span className="text-sm sand-yellow font-bold mr-2 bg-sand-yellow-800 px-2 rounded-full">{slippage} %</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current gun-metal hover:text-white">
                                        <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" strokeWidth="1.5" strokeLinejoin="round" />
                                        <path d="M10 15.5C10 16.3284 9.32843 17 8.5 17C7.67157 17 7 16.3284 7 15.5C7 14.6716 7.67157 14 8.5 14C9.32843 14 10 14.6716 10 15.5Z" strokeWidth="1.5" />
                                        <path d="M17 8.5C17 7.67157 16.3284 7 15.5 7C14.6716 7 14 7.67157 14 8.5C14 9.32843 14.6716 10 15.5 10C16.3284 10 17 9.32843 17 8.5Z" strokeWidth="1.5" />
                                        <path d="M8.5 14V7" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M15.5 10V17" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 h-[74px] border border-transparent relative rounded-xl flex flex-col space-y-3 group focus-within:border-v2-primary/50 focus-within:shadow-swap-input-dark bg-gun-metal-800">
                            <div className="flex">
                                <div className="flex flex-wrap justify-between items-center group/select">


                                    <div className="flex flex-wrap gap-2 ">
                                        <Button onClick={() => openTokensModal(1)} size="md" className="rounded-xl bg-gun-metal-900 enabled:hover:bg-gun-metal-700 border-transparent">
                                            <img src={tokenOne.img} className="mr-3 h-5 w-5" alt="" />
                                            <p>{tokenOne.ticker}</p>
                                            <img src={ArrowIcon} className="ml-3 h-5 w-5" alt="" />
                                        </Button>

                                    </div>
                                </div>
                                <span className="flex-1 text-right">
                                    <div className="flex flex-col text-right h-full">
                                        <input placeholder="0" className="h-full w-full bg-transparent disabled:cursor-not-allowed disabled:opacity-100 disabled:text-white text-white text-right font-semibold dark:placeholder:text-white/25 text-base md:text-xl outline-none" value={tokenOneAmount} onChange={changeAmount} disabled={!prices} />

                                        <div className="text-xs text-right gun-metal">~ {prices ? prices.tokenOne.toFixed(4) : "0"}</div>
                                    </div>
                                </span>
                            </div>
                        </div>


                        {/* swap button */}
                        <div className="relative inline-block inset-0 z-40 -mt-6 ">
                            <button onClick={switchToken} type="button" className="group/flip z-50 bg-[#EBEFF1] hover:bg-gun-metal-700  bg-gun-metal-800 w-8 h-8 rounded-full cursor-pointer flex flex-col justify-center border-[3px] border-[rgb(36,39,41)] dark:text-white-25 dark:hover:border-v2-primary dark:hover:shadow-swap-input-dark transform transition-transform hover:rotate-180">
                                <span className="w-full text-white/50 z-50 fill-current flex justify-center transition-none group-hover/flip:text-v2-primary/50 dark:group-hover/flip:text-v2-primary">
                                    <img src={SwapIcon} className="" alt="" />
                                </span>

                            </button>
                        </div>
                        {/* swap button */}


                        <div className="p-4 -mt-4 h-[74px] border border-transparent relative rounded-xl flex flex-col space-y-3 group focus-within:border-v2-primary/50 focus-within:shadow-swap-input-dark bg-gun-metal-800">
                            <div className="flex">
                                <div className="flex flex-wrap gap-2 ">
                                    <Button onClick={() => openTokensModal(2)} size="md" className="rounded-xl bg-gun-metal-900 enabled:hover:bg-gun-metal-700 border-transparent">
                                        <img src={tokenTwo.img} className="mr-3 h-5 w-5" alt="" />
                                        <p>{tokenTwo.ticker}</p>
                                        <img src={ArrowIcon} className="ml-3  h-5 w-5" alt="" />

                                    </Button>

                                </div>
                                <span className="flex-1 text-right">
                                    <div className="flex flex-col text-right h-full">
                                        <input placeholder="0" className="h-full w-full bg-transparent disabled:cursor-not-allowed disabled:opacity-100 disabled:text-blue-gray text-white text-right font-semibold dark:placeholder:text-white/25 text-base md:text-xl outline-none" value={tokenTwoAmount} disabled={true} />
                                        <div className="text-xs text-right gun-metal">~ ${prices ? prices.tokenTwo.toFixed(4) : "0"}</div>
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className="flex lg:gap-x-12 justify-between p-2 mt-2 px-5 rounded-xl bg-sand-yellow-800">
                            <div>
                                <p className="sand-yellow text-sm">1 {tokenOne.ticker}</p>
                            </div>
                            {/* <div mx-auto>=</div> */}
                            <div className="ml-auto">
                                <p className="sand-yellow text-sm">~ {prices ? prices.ratio.toFixed(6) : "0"} {tokenTwo.ticker}</p>
                            </div>
                        </div>

                        <div className="flex mt-6 text-sm" >
                            <button type="button" className="flex items-center h-14 w-full justify-center bg-gun-metal-900 hover:bg-gun-metal-800 text-white font-bold py-2 px-4 rounded-xl disabled:opacity-50" disabled={tokenOneAmount === '' || tokenOneAmount === "" || !isConnected} onClick={fetchDexAllowance}>
                                SWAP NOW
                            </button>
                        </div>
                        <div>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}

export default Swap