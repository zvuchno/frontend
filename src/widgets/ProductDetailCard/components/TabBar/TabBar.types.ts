type TabData = {
  id: string;
  title: string;
  description: React.ReactNode;
};

export interface TabBarProps {
  data: TabData[];
}