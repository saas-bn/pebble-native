export interface ButtonProps {
  onPress: () => void;
  disabled?: boolean;
  children: string | number;
  type?: "primary" | "secondary" | "link";
  loading?: boolean;
}
