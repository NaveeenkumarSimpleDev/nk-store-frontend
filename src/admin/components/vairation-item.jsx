import { MoreHorizontal, Trash2, FileTypeIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";

const VariationItem = ({ variation }) => {
  console.log({ variation });
  return (
    <tr className="p-4 text-lg">
      {/* <td>{variation?.attributes}</td> */}
      <td>
        {Object.keys(variation?.customAtributes).map((key) => {
          if (key && variation?.customAtributes[key]) {
            return (
              <p key={key}>
                {key} : {variation?.customAtributes[key]}
              </p>
            );
          }
        })}
      </td>
      <td>{variation?.price}</td>
      <td>{variation?.specs}</td>
      <td>{variation?.stock}</td>
      {/* <td>{variation?.images}</td> */}
      <td>images</td>
      <td>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal className="h-4 w-4 mx-auto cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <div className="flex items-center">
                <FileTypeIcon className="text-green-500 " />
                <span className="ml-2">Edit</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center">
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
