"use client";
import { ReservationStatus } from "@/interfaces/reservation-resonse";
import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { useCallback, useMemo, useState } from "react";

export const columns = [
  { name: "Destino", uid: "destination" },
  { name: "Hotel", uid: "hotel_name" },
  { name: "Habitacion", uid: "room_name" },
  { name: "Nº Habitaciones", uid: "rooms_number" },
  { name: "Adultos", uid: "number_adults" },
  { name: "Niños", uid: "number_children" },
  { name: "Check-in", uid: "start_date" },
  { name: "Check-out", uid: "end_date" },
  { name: "Estado", uid: "status" },
  { name: "Mensaje", uid: "error" },
];

interface TableProps {
  items: ReservationStatus[];
}

export const TableReservation = ({ items: rows }: TableProps) => {
  const renderCell = useCallback(
    (item: ReservationStatus, columnKey: React.Key) => {
      switch (columnKey) {
        case "destination":
          return (
            <div>
              <span>{item.destination}</span>
            </div>
          );
        case "hotel_name":
          return (
            <div>
              <span>{item.hotel_name}</span>
            </div>
          );
        case "room_name":
          return (
            <div>
              <span>{item.room_name}</span>
            </div>
          );

        case "rooms_number":
          return (
            <div>
              <span>{item.rooms_number}</span>
            </div>
          );
        case "number_adults":
          return (
            <div>
              <span>{item.number_adults}</span>
            </div>
          );
        case "number_children":
          return (
            <div>
              <span>{item.number_children}</span>
            </div>
          );
        case "start_date":
          return (
            <div>
              <span>{item.start_date}</span>
            </div>
          );
        case "end_date":
          return (
            <div>
              <span>{item.end_date}</span>
            </div>
          );
        case "status":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={item.status === "ok" ? "success" : "danger"}
            >
              <span className="capitalize text-xs">{item.status}</span>
            </Chip>
          );
        case "error":
          return (
            <div className="flex items-center gap-4">
              <span>{item.error}</span>
            </div>
          );
        default:
          return;
      }
    },
    []
  );

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows, rowsPerPage]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {rows.length} items
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [onRowsPerPageChange]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [items.length, page, pages]);

  return (
    <div className=" w-full flex flex-col gap-4">
      <Table
        topContent={topContent}
        bottomContent={bottomContent}
        aria-label="Example table with custom cells"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.rom_reservation_id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
