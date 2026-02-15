import React from "react";

const COLORS = {
    blue: "#5CB6D9",
    orange: "#F26A2E",
    rose: "#D65A8C",
    green: "#9ACD32",
    violet: "#9B6FAF",
};

export default function LogoText() {
    return (
        <span className="font-heading font-bold text-lg md:text-2xl leading-tight flex flex-wrap gap-x-1.5 items-center">
            {/* La */}
            <span style={{ color: COLORS.blue }}>La</span>

            {/* maison - All orange based on request "Orange (ex: 'maison')" */}
            <span style={{ color: COLORS.orange }}>maison</span>

            {/* des */}
            <span>
                <span style={{ color: COLORS.violet }}>d</span>
                <span style={{ color: COLORS.green }}>e</span>
                <span style={{ color: COLORS.blue }}>s</span>
            </span>

            {/* petits */}
            <span>
                <span style={{ color: COLORS.green }}>p</span>
                <span style={{ color: COLORS.orange }}>e</span>
                <span style={{ color: COLORS.rose }}>t</span>
                <span style={{ color: COLORS.orange }}>i</span>
                <span style={{ color: COLORS.green }}>t</span>
                <span style={{ color: COLORS.rose }}>s</span>
            </span>

            {/* loups */}
            <span>
                <span style={{ color: COLORS.rose }}>l</span>
                <span style={{ color: COLORS.blue }}>o</span>
                <span style={{ color: COLORS.violet }}>u</span>
                <span style={{ color: COLORS.blue }}>p</span>
                <span style={{ color: COLORS.rose }}>s</span>
            </span>
        </span>
    );
}
