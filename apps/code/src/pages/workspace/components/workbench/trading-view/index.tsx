import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import CodeEditor from "../../code-editor";
import { init, dispose } from 'klinecharts'
import { useEffect, useRef } from "react";
import { Ticker, CopyrightStyles, CryptoCurrencyMarket, Timeline, AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { Button } from "@/components/ui/button";
import "./index.css";

export default function TradingView() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {

    }, []);

    return (
        <ResizablePanelGroup className="flex flex-col h-full w-full" direction="vertical">
            <ResizablePanel className="flex flex-col">
                <div className="w-full">
                    <Ticker colorTheme="dark" />
                </div>
                <div className="flex justify-between">
                    <CryptoCurrencyMarket colorTheme="dark" width={150} height={600}></CryptoCurrencyMarket>
                    <div className="flex-1 h-[600px]">
                        <AdvancedRealTimeChart theme="dark" autosize></AdvancedRealTimeChart>
                    </div>
                    <Timeline colorTheme="dark" feedMode="market" market="crypto" width={300} height={600}></Timeline>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="flex flex-col flex-1">
                <div className="flex justify-between items-center p-2">
                    <div className="text-sm">复杂动量与波动率策略</div>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 px-2">
                            <Button
                                className="h-8"
                                variant="secondary"
                                onClick={() => {

                                }}
                            >
                                回测
                            </Button>
                            <Button className="h-8">部署</Button>
                        </div>
                    </div>
                </div>
                <CodeEditor className="h-full w-full" language="python" value={`//@version=5
strategy("Complex Momentum and Volatility Strategy", overlay=false)

// 输入参数
lookback_period = input.int(20, title="Lookback Period")
momentum_threshold = input.float(0.02, title="Momentum Threshold")
volatility_threshold = input.float(0.01, title="Volatility Threshold")
stop_loss = input.float(0.01, title="Stop Loss")
take_profit = input.float(0.03, title="Take Profit")

// 计算价格动量
momentum = ta.change(close, lookback_period) / close[lookback_period]

// 计算波动性（ATR，平均真实范围）
atr = ta.atr(lookback_period)

// 交易信号
buy_signal = momentum > momentum_threshold and atr < volatility_threshold
sell_signal = momentum < -momentum_threshold or close <= close[1] * (1 - stop_loss) // 止损条件
take_profit_signal = close >= close[1] * (1 + take_profit) // 止盈条件

// 交易逻辑
if (buy_signal and not position_size)
    strategy.entry("Buy", strategy.long)

if (sell_signal and position_size > 0)
    strategy.exit("Sell Loss", from_entry="Buy", limit=close[1] * (1 - stop_loss), stop=close[1] * (1 - stop_loss * 1.1)) // 设置止损和稍微宽松的止损以防滑点

if (take_profit_signal and position_size > 0)
    strategy.exit("Sell Profit", from_entry="Buy", limit=close[1] * (1 + take_profit)) // 设置止盈

// 可视化
plot(series=momentum, title="Momentum", color=color.blue, linewidth=2)
hline(y=momentum_threshold, title="Momentum Threshold", color=color.green, linestyle=hline.style_dashed)
hline(y=-momentum_threshold, title="-Momentum Threshold", color=color.red, linestyle=hline.style_dashed)

plot(series=atr, title="ATR (Volatility)", color=color.orange, linewidth=2)
hline(y=volatility_threshold, title="Volatility Threshold", color=color.purple, linestyle=hline.style_dashed)

// 可视化止损和止盈水平（仅用于回测和可视化，实际交易中由strategy.exit处理）
plotshape(series=buy_signal, title="Buy Signal", location=location.belowbar, color=color.green, size=size.small, style=shape.labelup, text="BUY")
plotshape(series=sell_signal, title="Sell Signal (Loss)", location=location.abovebar, color=color.red, size=size.small, style=shape.labeldown, text="SELL LOSS")
plotshape(series=take_profit_signal, title="Sell Signal (Profit)", location=location.abovebar, color=color.lime, size=size.small, style=shape.labeldown, text="SELL PROFIT")`} />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}