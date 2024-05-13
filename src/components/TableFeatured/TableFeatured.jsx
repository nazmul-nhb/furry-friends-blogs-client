import PropTypes from 'prop-types';
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel } from '@tanstack/react-table';
import './TableFeatured.css';
import { useState } from 'react';

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
                                headerGroup.headers.map(header => <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {
                                        { asc: '🔼', desc: '🔽' }[
                                        header.column.getIsSorted() ?? null
                                        ]
                                    }
                                </th>)
                            }
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {
                                row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {(flexRender(cell.column.columnDef.cell, cell.getContext()))}
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