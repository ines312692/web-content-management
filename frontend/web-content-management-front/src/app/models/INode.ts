export interface INode {
  id: string;
  name: string;
  type: "row" | "column" | "widget" | "button" | "text" | "image";
  children: INode[];
  selected: boolean;
  description?: string;
  widgetId?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderColor?: string;
  template : boolean;
}
