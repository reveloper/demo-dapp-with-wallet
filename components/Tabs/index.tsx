import { Box } from '../Box';
import { css } from '@emotion/react';

type Tab = {
  id: string;
  name: string;
}

type Props = {
  activeTab?: string;
  tabs: Tab[];
}

const styles = {
  tab: (isActive: boolean, tabsAmount: number) => () => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${isActive ? '#0098EA' : 'transparent'};
    width: calc(100% / ${tabsAmount} - ${(tabsAmount - 1) * 4}px);
    height: 32px;
    border-radius: 8px;
    font-weight: 600;
    color: ${isActive ? '#ffffff' : '#333333'};
  `
}

export const Tabs = ({ activeTab, tabs }: Props) => (
  <Box
    display="flex"
    flexWrap="nowrap"
    gap="4px"
    p="8px"
    radius="8px"
    background="#f2f2f2"
    width="100%"
  >
    {tabs.map((tab) => (
      <div css={styles.tab(activeTab === tab.id, tabs.length)} key={tab.id}>
        {tab.name}
      </div>
    ))}
  </Box>
)
