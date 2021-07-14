import {FunctionComponent} from "react";
import { TableList } from './ExtrasTableComponent.styled'

const ExtrasTableComponent : FunctionComponent<{items: string[]}> = ({items}) => {
    return (
        <TableList>
            {items.map((item: string,index: number) =>
                <li key={index}>{item}</li>
            )}
        </TableList>
    )
}

export default ExtrasTableComponent