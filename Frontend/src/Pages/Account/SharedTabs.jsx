import { Tabs } from "@mantine/core";
import React from "react";
import Logout from "../../Components/Logout";

export default function SharedTabs({
tabValue,
onChange,
tabValues,
orientation,
defaultValue,
isNestedTab,
color,
variant,
isSmallScreen,
}) {
return (
    <>
        <Tabs
            color={color}
            variant={variant}
            radius={"sm"}
            value={tabValue}
            onChange={onChange}
            orientation={orientation}
            defaultValue={defaultValue}
            className={!isNestedTab && "gap-12"}
        >
            <Tabs.List
                className={
                    isNestedTab
                    ? "mb-8 max-lg:w-full max-lg:!overflow-x-auto !flex-nowrap pb-2 before:!border-b-0"
                    : "gap-2 flex justify-center items-center w-full lg:w-1/5 max-lg:!overflow-x-auto mb-4 !flex-nowrap pb-2 before:!border-b-0"
                }
                grow={(isNestedTab || isSmallScreen) && true}
            >
            {tabValues?.map((tab) =>
                !tab?.isNotAccessable ? (
                <Tabs.Tab
                    key={tab.id}
                    value={tab.value}
                    className={`!flex !justify-center !items-center !px-4 !py-3 !rounded-lg !transition-all !duration-300 !cursor-pointer !font-medium !text-lg !min-w-[200px] ${
                        tabValue === tab?.value
                        ? "!bg-main !text-textSecondColor !font-bold !text-md"
                        : "!text-textColor hover:!bg-hoverColor"
                    }`}
                >
                    <div className='w-full gap-2 flex justify-center items-center'>
                        <span className="!text-md">{tab?.icon}</span>
                        <span>{tab?.label}</span>
                    </div>
                </Tabs.Tab>
                ) : null
            )}
            <Logout />

            </Tabs.List>

            {tabValues?.map(
            (tab) =>
                tabValue === tab?.value && (
                <Tabs.Panel
                    key={tab?.id}
                    value={tab?.value}
                    className={
                    isNestedTab
                        ? "sm:py-6 border border-[#C7C7CC] bg-white"
                        : "w-full lg:w-4/5"
                    }
                >
                    {tab?.Panel}
                </Tabs.Panel>
                )
            )}
        </Tabs>
    </>
);
}
