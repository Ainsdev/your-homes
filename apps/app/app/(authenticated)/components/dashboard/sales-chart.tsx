"use client"

// import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@repo/design-system"

interface SalesData {
  date: number
  amount: number
}

const fakeData = [
  { date: 1714329600, amount: 100000 },
  { date: 1714416000, amount: 150000 },
  { date: 1714502400, amount: 200000 },
]

export function SalesChart() {
  // const [data, setData] = useState<SalesData[]>([])
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true)
  //       const response = await fetch('/api/dashboard/sales')
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch sales data')
  //       }
  //       const salesData = await response.json()
  //       // Ensure salesData matches SalesData type by filtering out null values
  //       const validSalesData = salesData.filter(
  //         (item: any): item is SalesData =>
  //           item.date !== null &&
  //           item.amount !== null
  //       )
  //       setData(validSalesData)
  //     } catch (err) {
  //       console.error('Error fetching sales data:', err)
  //       setError(err instanceof Error ? err.message : 'Failed to fetch sales data')
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   fetchData()
  // }, [])

  // if (isLoading) {
  //   return <div className="flex items-center justify-center h-[350px]">Loading...</div>
  // }

  // if (error) {
  //   return <div className="flex items-center justify-center h-[350px] text-red-500">{error}</div>
  // }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={fakeData}>
        <XAxis
          dataKey="date"
          tickFormatter={(value) => new Date(value * 1000).toLocaleDateString()}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          stroke="#888888"
          fontSize={12}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload as SalesData
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Date
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {new Date(data.date * 1000).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Amount
                      </span>
                      <span className="font-bold">
                        ${data.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="amount"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "var(--primary)", opacity: 0.8 },
          }}
          style={{
            stroke: "var(--primary)",
            opacity: 0.5,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

