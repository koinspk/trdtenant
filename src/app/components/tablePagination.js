import React, { useEffect, useState } from 'react';
import { TablePagination } from '@mui/material';

function TablePaginationFeild({
    rowsPerPageOptions,
    rowsPerPage,
    count,
    changeEvent,
    page,
    onRowsPerPageChange
}) {
    
    return (
        <TablePagination
            defaultPage={1}
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => changeEvent(page)}
          onRowsPerPageChange={(event) => onRowsPerPageChange(event)}
        />

    )
}

export default TablePaginationFeild
