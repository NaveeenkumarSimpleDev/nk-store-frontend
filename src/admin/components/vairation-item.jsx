import { MoreHorizontal, Trash2, FileTypeIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";

const VariationItem = ({
  variation,
  idx,
  setEditing,
  setVariations,
  setVariationAttributes,
}) => {
  return (
    <tr className="p-4 text-lg">
      <td>{idx + 1}</td>
      <td>
        {Object.keys(variation?.customAttributes).map((key) => {
          if (key && variation?.customAttributes[key]) {
            return (
              <p key={key}>
                {key} : {variation?.customAttributes[key]}
              </p>
            );
          }
        })}
      </td>
      <td>{variation?.price}</td>
      <td>{variation?.specification || "not available"}</td>
      <td>{variation?.stock}</td>
      <td>images</td>
      <td>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal className="h-4 w-4 mx-auto cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <div
                className="flex items-center"
                onClick={() => setEditing(variation)}
              >
                <FileTypeIcon className="text-green-500 " />
                <span className="ml-2">Edit</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div
                className="flex items-center"
                onClick={() => {
                  const confirm = window.confirm(
                    "Are you sure you want to delete this Variation?"
                  );
                  if (confirm) {
                    setVariations((prev) => {
                      if (prev?.length === 1) setVariationAttributes([]);
                      return prev.filter((v) => v.id !== variation.id);
                    });
                  }
                }}
              >
                <Trash2 className="text-red-500" />
                <span className="ml-2">Delete</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default VariationItem;
