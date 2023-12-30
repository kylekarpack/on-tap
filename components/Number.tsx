import { FunctionComponent } from "react";

const compactFormatter = new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" });
const percentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

/**
 * Display a number in a compact format
 */
export const CompactNumber: FunctionComponent<{ value: number }> = ({ value }) => <>{compactFormatter.format(value)}</>;

/**
 * Display a number as a percentage
 */
export const Percentage: FunctionComponent<{
  value: number;
}> = ({ value }) => <>{percentageFormatter.format(value / 100)}</>;
