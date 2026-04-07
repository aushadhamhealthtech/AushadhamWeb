"use client";

import { useMemo, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Range = "weekly" | "monthly" | "yearly";

type VisitData = {
  label: string;
  male: number;
  female: number;
  inPerson: number;
  online: number;
};

const visitsByRange: Record<Range, VisitData[]> = {
  weekly: [
    { label: "Mon", male: 12, female: 9, inPerson: 14, online: 11 },
    { label: "Tue", male: 15, female: 11, inPerson: 16, online: 12 },
    { label: "Wed", male: 11, female: 13, inPerson: 13, online: 10 },
    { label: "Thu", male: 16, female: 12, inPerson: 17, online: 13 },
    { label: "Fri", male: 14, female: 15, inPerson: 18, online: 14 },
    { label: "Sat", male: 10, female: 11, inPerson: 12, online: 10 },
    { label: "Sun", male: 8, female: 7, inPerson: 9, online: 8 },
  ],
  monthly: [
    { label: "Jan", male: 30, female: 20, inPerson: 35, online: 28 },
    { label: "Feb", male: 38, female: 30, inPerson: 42, online: 35 },
    { label: "Mar", male: 25, female: 38, inPerson: 30, online: 22 },
    { label: "Apr", male: 42, female: 28, inPerson: 38, online: 40 },
    { label: "May", male: 35, female: 45, inPerson: 40, online: 30 },
    { label: "Jun", male: 28, female: 35, inPerson: 32, online: 42 },
    { label: "Jul", male: 45, female: 25, inPerson: 44, online: 35 },
    { label: "Aug", male: 32, female: 40, inPerson: 28, online: 38 },
    { label: "Sep", male: 38, female: 32, inPerson: 35, online: 30 },
    { label: "Oct", male: 42, female: 38, inPerson: 40, online: 45 },
    { label: "Nov", male: 35, female: 42, inPerson: 38, online: 32 },
    { label: "Dec", male: 40, female: 36, inPerson: 41, online: 34 },
  ],
  yearly: [
    { label: "2021", male: 310, female: 295, inPerson: 340, online: 265 },
    { label: "2022", male: 338, female: 318, inPerson: 365, online: 291 },
    { label: "2023", male: 351, female: 340, inPerson: 379, online: 312 },
    { label: "2024", male: 366, female: 355, inPerson: 395, online: 326 },
    { label: "2025", male: 384, female: 369, inPerson: 409, online: 344 },
    { label: "2026", male: 398, female: 386, inPerson: 421, online: 363 },
  ],
};

export default function PatientsChart() {
  const [range, setRange] = useState<Range>("monthly");
  const data = visitsByRange[range];

  const metrics = useMemo(() => {
    const totals = data.reduce(
      (acc, point) => {
        acc.male += point.male;
        acc.female += point.female;
        acc.inPerson += point.inPerson;
        acc.online += point.online;
        return acc;
      },
      { male: 0, female: 0, inPerson: 0, online: 0 }
    );

    const totalVisits = totals.inPerson + totals.online;
    const onlineShare = totalVisits > 0 ? Math.round((totals.online / totalVisits) * 100) : 0;
    const peak = data.reduce((best, point) => {
      const pointTotal = point.inPerson + point.online;
      return pointTotal > best.total ? { label: point.label, total: pointTotal } : best;
    }, { label: data[0]?.label ?? "-", total: 0 });

    const midpoint = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, midpoint).reduce((sum, point) => sum + point.inPerson + point.online, 0);
    const secondHalf = data.slice(midpoint).reduce((sum, point) => sum + point.inPerson + point.online, 0);
    const trend = firstHalf > 0 ? ((secondHalf - firstHalf) / firstHalf) * 100 : 0;

    return {
      totalVisits,
      onlineShare,
      peak,
      avgPerPoint: Math.round(totalVisits / data.length),
      trend,
    };
  }, [data]);

  const trendUp = metrics.trend >= 0;

  return (
    <Card className="rounded-2xl flex-1 shadow-sm border-gray-100">
    <CardContent className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Patients Visits</p>
            <p className="text-xs text-gray-400">Gender + visit mode performance</p>
          </div>
        </div>
        <Select value={range} onValueChange={(value) => setRange(value as Range)}>
          <SelectTrigger className="w-28 h-8 text-sm text-gray-500 border-none shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
          <p className="text-[11px] text-gray-500">Total visits</p>
          <p className="text-sm font-bold text-gray-800">{metrics.totalVisits}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
          <p className="text-[11px] text-gray-500">Avg / period</p>
          <p className="text-sm font-bold text-gray-800">{metrics.avgPerPoint}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
          <p className="text-[11px] text-gray-500">Online share</p>
          <p className="text-sm font-bold text-gray-800">{metrics.onlineShare}%</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
          <p className="text-[11px] text-gray-500">Peak</p>
          <p className="text-sm font-bold text-gray-800">{metrics.peak.label} · {metrics.peak.total}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            labelStyle={{ fontWeight: 600 }}
          />
          <Line type="monotone" dataKey="male" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="female" stroke="#f97316" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="inPerson" stroke="#22c55e" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="online" stroke="#06b6d4" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-5 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-blue-500 rounded"></div>
          <span>Male</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-orange-400 rounded"></div>
          <span>Female</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-green-500 rounded"></div>
          <span>In-person</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-cyan-400 rounded"></div>
          <span>Online</span>
        </div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${trendUp ? "text-emerald-600" : "text-red-500"}`}>
          {trendUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {trendUp ? "+" : ""}{metrics.trend.toFixed(1)}% trend
        </div>
      </div>
    </CardContent>
    </Card>
  );
}
