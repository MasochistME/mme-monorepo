import { useState } from 'react';
import styled from 'styled-components';

import { Order, TableColumn, TableRow } from './types';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';

type Props<T> = {
	columns: TableColumn<T>[];
	dataset: T[];
	rowsPerPage?: number;
};

export const Table = <T extends Record<any, any>>(props: Props<T>) => {
	const { columns, dataset, rowsPerPage: _rowsPerPage } = props;
	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<string>();
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(_rowsPerPage ?? 20);

	const fixedDataset = dataset.map(
		item =>
			columns.map(col => ({
				...col,
				...(col.value ? { value: col.value(item) } : {}),
				...(col.render ? { render: col.render(item) } : {}),
			})) as {
				key: string;
				title: React.ReactNode;
				value: string | number;
				render: React.ReactNode;
				style?: React.CSSProperties;
			}[],
	);

	const fixedColumns = (fixedDataset[0] ?? []).map(col => ({
		key: col.key,
		title: col.title,
		...(col.style ? { style: col.style } : {}),
	}));
	const fixedRows: TableRow[][] = fixedDataset.map(row =>
		row.map(item => ({
			key: item.key,
			value: item.value,
			cell: item.render ?? item.value ?? '—',
		})),
	);

	const handleRequestSort = (
		_event: React.MouseEvent<unknown>,
		property: string,
	) => {
		setOrderBy(property);
		setOrder(order === 'asc' ? 'desc' : 'asc');
	};

	const tableHeaderCells = fixedColumns.map(column => ({
		disablePadding: false,
		id: column.key,
		label: column.title,
		numeric: false,
	}));

	const colGroup = fixedColumns.map(col => <col style={col.style ?? {}} />);

	return (
		<StyledTable className="MuiTable-root" aria-label="simple table">
			<colgroup>{colGroup}</colgroup>
			<TableHeader
				order={order}
				orderBy={orderBy}
				tableHeaderCells={tableHeaderCells}
				onRequestSort={handleRequestSort}
			/>
			<TableBody
				rows={fixedRows}
				page={page}
				rowsPerPage={rowsPerPage}
				order={order}
				orderBy={orderBy}
			/>
			<TablePagination
				rows={fixedRows}
				page={page}
				setPage={setPage}
				rowsPerPage={rowsPerPage}
				setRowsPerPage={setRowsPerPage}
			/>
		</StyledTable>
	);
};

const StyledTable = styled.table`
	width: 100%;
	border-spacing: 0;
	table-layout: auto;
	td,
	th {
		padding: 0 4px;
		width: 1px;
	}
	td + {
		padding: 0 4px;
		margin: 0;
		border: none;
	}
`;
