export interface SortOption {
  value: string;
  label: string;
}

export interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose: () => void;
  confirmButtonProps?: {
    bgColor?: string;
    textColor?: string;
    hasBorder?: boolean;
  };
  cancelButtonProps?: {
    bgColor?: string;
    textColor?: string;
    hasBorder?: boolean;
  };
  // Propriedades para variante de ordenação
  variant?: 'default' | 'sort';
  sortOptions?: SortOption[];
  selectedSort?: string;
  onSortChange?: (value: string) => void;
}