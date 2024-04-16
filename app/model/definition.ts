export interface PPdfConvertHtmlContent {
  content: string;
  headerTemplate?: string;
  footerTemplate?: string;
  style?: string;
  format?: string;
  landscape?: boolean;
  width?: string | number;
  height?: string | number;
  filename?: string;
  margin?: {
    top?: string | number,
    left?: string | number,
    right?: string | number,
    bottom?: string | number,
  };
}
