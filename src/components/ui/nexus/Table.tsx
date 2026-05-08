/**
 * NEXUS.OS — Table
 * Schema-driven table with Nexus styling baked in.
 */
import type { ReactNode } from 'react';

type Align = 'left' | 'right' | 'center';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  align?: Align;
  mono?: boolean;
  width?: string | number;
  render?: (row: T, value: unknown) => ReactNode;
}

interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  rows: T[];
  empty?: ReactNode;
  loading?: boolean;
  rowKey?: keyof T | string;
  onRowClick?: (row: T) => void;
  className?: string;
}

const ALIGN: Record<Align, string> = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
};

function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  empty = null,
  loading = false,
  rowKey = 'id',
  onRowClick,
  className = '',
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="nd-label">Cargando…</p>
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <>
        {empty || (
          <div className="px-4 py-12 text-center">
            <p className="nd-label">Sin registros</p>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="nx-table w-full">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={ALIGN[c.align ?? 'left']}
                style={c.width ? { width: c.width } : undefined}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={String(row[rowKey as keyof T] ?? `row-${index}`)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={onRowClick ? 'cursor-pointer' : ''}
            >
              {columns.map((c) => {
                const value = row[c.key as keyof T];
                const content = c.render ? c.render(row, value) : (value as ReactNode);
                return (
                  <td
                    key={c.key}
                    className={`${ALIGN[c.align ?? 'left']} ${c.mono ? 'mono num' : ''}`}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
