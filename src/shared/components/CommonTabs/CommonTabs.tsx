import { Flex, Tooltip } from "antd";

import { CommonButton } from "../CommonButton/CommonButton";

import { TOKENS } from "../../theme";

import styles from "./CommonTabs.module.css";

type TabType = {
  key: string;
  name: string;
  icon: React.ReactNode;
  disabled?: boolean;
  hide?: boolean;
};

export type CommonTabsProps = {
  tabs: TabType[];
  containerClass?: string;
  activeTab: string;
  onChangeTab: (key: string) => void;
};

export const CommonTabs = ({ tabs, activeTab, onChangeTab, containerClass }: CommonTabsProps) => {
  return (
    <Flex
      vertical gap={TOKENS.space[10]}
      className={containerClass}
    >
      {tabs.filter((tab) => !tab.hide).map((tab) => (
        <Flex justify="center" key={tab.key}>
          <Tooltip title={tab.name} placement="right">
            <CommonButton
              onClick={() => onChangeTab?.(tab.key)}
              icon={tab.icon}
              size="large"
              buttonVariant="noBorder"
              className={activeTab === tab.key ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              hoverEffect={activeTab !== tab.key}
              disabled={tab.disabled}
            />
          </Tooltip>
        </Flex>
      ))}
    </Flex>
  );
};
