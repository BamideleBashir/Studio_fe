import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { FaTimes } from "react-icons/fa";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  hideCancel?: boolean;
};

const ModalBase = ({ open, onClose, title, children, hideCancel }: ModalProps) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Overlay className="modal_overlay z-10" />

      <AlertDialog.Content className="modal_content z-20">
        <div className="bg-white p-6 rounded-2xl">
          <div className="flex justify-between items-center">
            <AlertDialog.Title className="text-lg font-medium text-gray-700 mb-2">
              {title}
            </AlertDialog.Title>

            <div>
              <FaTimes
                onClick={onClose}
                className="text-red-400 cursor-pointer"
              />
            </div>
          </div>

          <AlertDialog.Description className="w-full py-2">
            {children}
          </AlertDialog.Description>

          {!hideCancel && (
            <div className="text-center">
              <button
                onClick={onClose}
                className="text-center text-red-400 font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ModalBase;
