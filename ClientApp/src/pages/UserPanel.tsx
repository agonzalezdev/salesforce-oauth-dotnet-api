import MaterialTable from 'material-table';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';


const UserPanel = () => {

    const columns = [
        { title: 'Name', field: 'name', sorting: false },
        { title: 'Email', field: 'email', sorting: false },
        { title: 'Phone', field: 'phone', sorting: false },
        { title: 'Birthdate', field: 'birthdate', hidden: true },
        { title: 'Department', field: 'department', hidden: true },
        { title: 'Description', field: 'description', hidden: true },
        { title: 'Fax', field: 'fax', hidden: true },
        { title: 'Title', field: 'title', hidden: true }
    ]

    return (
        <MaterialTable
            title="Salesforce Contacts"
            columns={columns}
            style={{ minWidth: '90vw', maxWidth: '97vw', overflow: 'auto' }}
            options={{
                search: false
            }}
            data={query =>
                new Promise(async (resolve, reject) => {
                    let url = `${window.location.origin}/contacts?limit=${query.pageSize}&offset=${(query.page * query.pageSize)}`;
                    fetch(url)
                        .then(response => response.json())
                        .then(result => {
                            resolve({
                                data: result.records,
                                page: query.page,
                                totalCount: result.totalSize,
                            })
                        })
                })
            }
            detailPanel={(rowData) => (
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {columns.filter(e => e.hidden).map(e => (
                                    <TableCell>{e.title}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {columns.filter(e => e.hidden).map(e => (
                                    <TableCell>{rowData[e.field] ?? "-"}</TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            onRowClick={(event, rowData, togglePanel) => togglePanel !== undefined ? togglePanel() : () => { }}
        />
    )
}


export default UserPanel

