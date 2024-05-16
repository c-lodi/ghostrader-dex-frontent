import React from "react";
import { Table } from "flowbite-react";
import ETH from "../assets/eth.svg"

function Tokens(tokenProps) {

    const tokens = tokenProps.tokens


    function truncateString(str, num) {
        if (str.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    }

    return (
        <div className="inset-0 flex items-center justify-center bg-gun-metal-900 min-h-screen py-[200px]">
            <div className="max-w-full overflow-auto">

                <Table hoverable className="min-w-[600px]">
                    <Table.Head>
                        <Table.HeadCell className="bg-gun-metal-800 blue-gray">Coin Name</Table.HeadCell>
                        <Table.HeadCell className="bg-gun-metal-800 blue-gray">Symbol</Table.HeadCell>
                        <Table.HeadCell className="bg-gun-metal-800 blue-gray">Decimals</Table.HeadCell>
                        <Table.HeadCell className="bg-gun-metal-800 blue-gray">Address</Table.HeadCell>
                        <Table.HeadCell className="bg-gun-metal-800">
                            <span className="sr-only">Trade</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {tokens.map((token) => (
                            <Table.Row key={token.address} className="bg-gun-metal-700 blue-gray border-slate-700 dark:bg-gray-800 hover:bg-slate-600">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <div className="flex items-center blue-gray">
                                        <img src={token.logoURI} className="w-6 h-6 mr-2" alt={`${token.name} logo`} />
                                        <span>{truncateString(token.name, 20)}</span>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>{truncateString(token.symbol, 5)} </Table.Cell>
                                <Table.Cell>{token.decimals}</Table.Cell>
                                <Table.Cell>{token.address.slice(0, 6) + "..." + token.address.slice(-4)}</Table.Cell>
                                <Table.Cell>
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Trade
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>

    )
}

export default Tokens;