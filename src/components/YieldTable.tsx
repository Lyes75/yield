import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { formatNumber, formatPercent } from "@/lib/utils";

export interface YieldData {
  protocol: string;
  chain: string;
  apy: number;
  tvl: number;
  pool: string;
  rewardTokens: string[];
}

interface YieldTableProps {
  data: YieldData[];
  isLoading: boolean;
}

export function YieldTable({ data, isLoading }: YieldTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof YieldData;
    direction: "asc" | "desc";
  }>({ key: "tvl", direction: "desc" });

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const requestSort = (key: keyof YieldData) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Card className="w-full overflow-hidden bg-[#2A2F3C]/50 border-[#9b87f5]/20 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b-[#9b87f5]/20">
            <TableHead
              className="cursor-pointer hover:bg-[#1A1F2C]/50 text-[#D6BCFA]"
              onClick={() => requestSort("protocol")}
            >
              Protocol
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-[#1A1F2C]/50 text-[#D6BCFA]"
              onClick={() => requestSort("chain")}
            >
              Chain
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
              onClick={() => requestSort("apy")}
            >
              APY
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
              onClick={() => requestSort("tvl")}
            >
              TVL
            </TableHead>
            <TableHead className="text-[#D6BCFA]">Pool</TableHead>
            <TableHead className="text-[#D6BCFA]">Reward Tokens</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, idx) => (
            <TableRow key={`${row.protocol}-${row.pool}-${idx}`} className="border-b-[#9b87f5]/20 hover:bg-[#1A1F2C]/30">
              <TableCell className="font-medium text-[#D6BCFA]">{row.protocol}</TableCell>
              <TableCell className="text-[#D6BCFA]">{row.chain}</TableCell>
              <TableCell className="text-right font-mono text-[#8B5CF6]">
                {formatPercent(row.apy)}
              </TableCell>
              <TableCell className="text-right font-mono text-[#9b87f5]">
                ${formatNumber(row.tvl)}
              </TableCell>
              <TableCell className="text-[#D6BCFA]">{row.pool}</TableCell>
              <TableCell>
                {row.rewardTokens.map((token, i) => (
                  <span
                    key={token}
                    className="inline-block bg-[#9b87f5]/10 text-[#D6BCFA] px-2 py-1 rounded-full text-sm mr-1"
                  >
                    {token}
                  </span>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function LoadingState() {
  return (
    <Card className="w-full p-4 bg-[#2A2F3C]/50 border-[#9b87f5]/20 backdrop-blur-sm">
      <div className="space-y-3">
        <div className="h-4 bg-[#1A1F2C] rounded animate-pulse" />
        <div className="h-4 bg-[#1A1F2C] rounded animate-pulse w-5/6" />
        <div className="h-4 bg-[#1A1F2C] rounded animate-pulse" />
      </div>
    </Card>
  );
}