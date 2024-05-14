import PropTypes from 'prop-types';
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel } from '@tanstack/react-table';
import './TableFeatured.css';
import { useState } from 'react';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';

const TableFeatured = ({ data, columns }) => {
    const [sortBlog, setSortBlog] = useState([]);

    const table = useReactTable({
        data, columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting: sortBlog },
        onSortingChange: setSortBlog
    });

    return (
        <div className='featured-container'>
            <table className='featured-table overflow-x-auto'>
                <thead className='overflow-x-auto'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {
                                headerGroup.headers.map(header => <th className='text-blue-900 font-semibold' key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {
                                        { asc: <RiSortAsc className='inline ml-2' />, desc: <RiSortDesc className='inline ml-2' /> }[
                                        header.column.getIsSorted() ?? null
                                        ]
                                    }
                                </th>)
                            }
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={row.id}>
                            {
                                row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {cell.column.columnDef.accessorKey === 'total_characters' ? (index + 1)
                                            : (flexRender(cell.column.columnDef.cell, cell.getContext()))}
                                    </td>
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

TableFeatured.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
}

export default TableFeatured;