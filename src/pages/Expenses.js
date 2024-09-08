import { t } from "i18next";
import ExpenseForm from "../components/ExpenseForm";
import ToolBanner from "../components/ToolBanner";
import { CheckCircleOutlined, CloseCircleOutlined, DownloadOutlined, FileDoneOutlined, Loading3QuartersOutlined, PlusOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Drawer, List, Spin, Table, Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { errorColor, infoColor, primaryTextColor, successColor } from "../css";
import { getExpensesByEmployeeIdAndCompanyId } from "../services/expenseService";
import { useAppContext } from "../context/AppContext";
import Spinner from "../components/Spinner";

function Expenses() {
    const [expenseFormFlyOut, setExpenseFormFlyOut] = useState(false);
    const [loadingExpenses, setLoadingExpenses] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const {state, saveSelectedTool} = useAppContext();

    const [expensesForTable, setExpensesForTable] = useState([]);

    const columns = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
            title: 'Attachment',
            dataIndex: 'attachment',
            key: 'attachment',
          }
      ];

    useEffect(() => {
        saveSelectedTool('Expenses');
        return () => {
            saveSelectedTool(null);
        }
    }, [])

    const loadExpenses = () => {
        setLoadingExpenses(true);
        getExpensesByEmployeeIdAndCompanyId(state.apiToken).then(res => {
            setExpenses(res.data);
            setExpensesForTable(res.data.map(exp => (
                {
                    key: exp.employeeId,
                    date: new Date(exp.expenseDate).toDateString(),
                    amount: exp.currency + " " + exp.amount,
                    category: exp.category,
                    description: exp.description,
                    status: exp.status,
                    attachment: <a style={{color: infoColor}} href={exp.attachment} target="_blank" download={'file.jpeg'}>
                                    <DownloadOutlined /> &nbsp; Download
                                </a>
                }
            )));
            setLoadingExpenses(false);
        }).catch(() => {
            setLoadingExpenses(false);
            setExpenses([]);
            console.log("Something went wrong while fetching expenses");
        })
    }

    useEffect(() => {
        loadExpenses();
    }, [])

    return (
        <>
            <ToolBanner icon={<FileDoneOutlined />} title={t('Expenses')} subTitle={t('Manage Expense Reports')} />
            {loadingExpenses ? <Spinner text={'Expenses'} height={'60vh'} /> : <div style={{margin: '0px 40px'}}>
                <br/>
                <br/>
            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Button onClick={() => setExpenseFormFlyOut(true)}>Add Expense <PlusOutlined /></Button>
            </div>
            <br/>
            <br/>
            <br/>
            <h3 style={{
                marginBottom: '5px',
                fontWeight: '400',
                color: primaryTextColor
            }}>List of Submitted Items</h3>
            <Tabs
            style={{}}
                label="faf"
                id="career-and-performance-tabs"
                defaultActiveKey="1"
                items={[
                {
                    label: 'Pending',
                    key: '1',
                    icon: <WarningOutlined style={{color: 'orange'}} />,
                    children: <Table size="small" pagination={{pageSize: 9}} columns={columns} dataSource={expensesForTable?.filter(exp => exp.status == 0)} />
                },
                {
                    label: 'Approved',
                    key: '2',
                    icon: <CheckCircleOutlined style={{color: successColor}} />, 
                    children: <Table size="small" pagination={{pageSize: 9}} columns={columns} dataSource={expensesForTable?.filter(exp => exp.status == 1)} />
                },
                {
                    label: 'Rejected',
                    key: '3',
                    icon: <CloseCircleOutlined style={{color: errorColor}}/>,
                    children: <Table size="small" pagination={{pageSize: 9}} columns={columns} dataSource={expensesForTable?.filter(exp => exp.status == -1)} />

                }
                // {
                //     label: 'Feedbacks',
                //     key: '3',
                //     children: 'Coming soon'
                // }
                ]}
                />
                </div>}
            <Drawer title={<span style={{fontWeight: '500'}}>Add Expense</span>} placement="right" width={'50%'} style={{padding: '3px'}} onClose={() => {
                setExpenseFormFlyOut(false);
                }} open={expenseFormFlyOut}> 
                <br/> 
                <ExpenseForm expenseItemCreated={loadExpenses} setExpenseFormFlyOut={setExpenseFormFlyOut} />
                </Drawer>
        </>
     );
}

export default Expenses;