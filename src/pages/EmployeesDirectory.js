import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Col, Row, Select, Upload, message, Dropdown, Tooltip, Alert, Result } from 'antd';
import { ArrowRightOutlined, CiOutlined, DownloadOutlined, InfoCircleFilled, RightCircleOutlined, UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import { errorColor, infoColor, successColor, white } from '../css';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';
import { postEmployeesInbulk } from '../services/employeeService';
import { useAppContext } from '../context/AppContext';
import { t } from 'i18next';
import { getCompanyById } from '../services/companyService';

const FieldMapping = ({ csvFieldNames, appFieldNames, mandatoryFields, onMappingComplete, employeesWithCsvFields}) => {
  const [mapping, setMapping] = useState({});
  const [mandMapDone, setMandMapDone] = useState(false);

  const {state} = useAppContext();

  const [creatingDirectoryInDb, setCreatingDirectoryInDb] = useState(false);

  useEffect(() => {
    setMandMapDone(true);
    mandatoryFields?.map((field) => {
        function hasDuplicates(array) {
            return new Set(array).size !== array.length;
          }
          
        if(!Object.values(mapping).includes(field.value) || hasDuplicates(Object.values(mapping))){
            setMandMapDone(false);
        }
    })
    if(Object.values(mapping).length < mandatoryFields.length){
        setMandMapDone(false);
    }
  },[mapping]);

  const handleMappingChange = (csvField, appField) => {
    setMapping((prevMapping) => ({
      ...prevMapping,
      [csvField]: appField,
    }));
  };

  const columns = [
    {
      title: 'Your CSV Field Name',
      dataIndex: 'csvField',
      key: 'csvField',
    },
    {
      title: 'System Field Name',
      dataIndex: 'appField',
      key: 'appField',
      render: (text, record) => (
        <> <Select
        size='small'
      defaultValue="Select"
      style={{ minWidth: '160px' }}
      onChange={(e) => handleMappingChange(record.csvField, e)}
      options={appFieldNames.map((field) => Object.values(mapping).includes(field.value) ? {...field, disabled: true} : field) || []}
    />
    </>
      ),
    },
  ];

  const dataSource = csvFieldNames.map((csvField) => ({
    csvField,
    appField: mapping[csvField],
  }));

  const handleSaveMapping = () => {
    const employeeswithSystemFields = employeesWithCsvFields.map(employee => {
        const newEmpObj = {};
        Object.keys(employee).map(key => {
            if(mapping[key]){
                newEmpObj[mapping[key]] = employee[key];
            }
        });
        return newEmpObj;
    });
    
    setCreatingDirectoryInDb(true);
   
    postEmployeesInbulk(employeeswithSystemFields.map( emp => { return { ...emp, companyId: localStorage.getItem('companyhris') } }), state.apiToken).then(res => {
          window.location.reload();
    }).catch(err => {
      setCreatingDirectoryInDb(false);
        message.error(err.message);
    })
    // send employeeswithSystemFields to api to be stored in the db
  };

  return ( creatingDirectoryInDb ? <Spinner height={'50vh'} text={"Creating directory... It may take a while, kindly do not refresh!"} /> :
    <div style={{
        width: '50%',
        margin: 'auto',
        backgroundColor: white,
        padding: '45px 60px',
        borderRadius: '5px'
    }}>
      <h1 style={{margin: '0px', fontWeight: '500', color: 'grey'}}>Map your field names to ours</h1>
      <span>Map the fields</span> 
      
      <br/>
      <br/>
      <br/>
      <Table style={{
        maxHeight: '50vh',
        overflow: 'auto'
      }} 
      pagination={false}
      size='small'
      dataSource={dataSource} columns={columns} rowKey="csvField" />
      <br/>
      <br/>
      <div style={{display:'flex', justifyContent: 'space-between'}}>
        <Button type="primary" disabled={!mandMapDone} onClick={handleSaveMapping}>
            Create directory
        </Button>
        <div>
        <Tooltip color={mandMapDone ? successColor : errorColor} title={mandMapDone ? "All mandatory fields are set, you can create the directory now!" : "All mandatory fields are required and no duplicates are allowed!"}>
        <InfoCircleFilled style={{color: mandMapDone ? successColor : errorColor}} />
        </Tooltip>
        &nbsp;
        &nbsp;
        <Select
        value={'List of mandatory fields'}
        style={{ minWidth: '160px', border: '0px', fontWeight: '300' }}
        options={mandatoryFields}
        />
        </div>
      </div>
    </div>
  );
};

function EmployeesDirectory() {
    const {state, saveSelectedTool} = useAppContext();

    useEffect(() => {
      saveSelectedTool(t('Employees Directory'));
    }, []);

    const [fieldsData, setFieldsData] = useState([]);

     // It will store the file uploaded by the user
     const [file, setFile] = useState("");

    const [showMappingScreen, setShowMappingScreen] = useState(false);

    const [processingCSV, setProcessingCSV] = useState(false);

    const [employeesWithCsvFields, setEmployeesWithCsvFields] = useState([]);

    
    const CsvUploadForm = ({ onSubmit }) => {

        //   const [form] = Form.useForm();
          const [fieldMappings, setFieldMappings] = useState({});
        
          // Allowed extensions for input file
          const allowedExtensions = ["csv"];
        
          // This state will store the parsed data
        
          // It state will contain the error when
          // correct file extension is not used
          const [error, setError] = useState("");
        
          const handleFileUpload = () => {

            setProcessingCSV(true);
            
            // If user clicks the parse button without
            // a file we show a error
            if (!file) return alert("Enter a valid file");
        
            // Initialize a reader which allows user
            // to read any file or blob.
            const reader = new FileReader();
        
            // Event listener on reader when the file
            // loads, we parse it and set the data.
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, {
                  header: true,
                });
                const parsedData = csv?.data;
            
                // Check if there's data and access the first row
                if (!parsedData || !parsedData.length) {
                  console.error('No data found in the CSV file');
                  return; // Handle empty data scenario (optional)
                }
                setEmployeesWithCsvFields(parsedData);
                const firstRowKeys = Object.keys(parsedData[0]);
            
                // Access and utilize the firstRowKeys here
                console.log('Keys of the first row:', firstRowKeys);
        
                await setTimeout(()=>{
                    setFieldsData(firstRowKeys);
                    setProcessingCSV(true);
                    setShowMappingScreen(true);
                }, 2000);
               

                // setData(parsedData); // If you still need the full data
              };
            
              reader.readAsText(file);
        };
        
        useEffect(()=>{
           if(file != "") { if(!processingCSV) handleFileUpload()}
        }, [file]);

        // useEffect(() => {
        //     return () => {
        //         if(file != "") message.success('File uploaded successfully');
        //        }
        // }, []);
        
        const handleFileChange = (e) => {
            setError("");
        
            // Check if user has entered the file
            if (e.fileList.length) {
                const inputFile = e.fileList[0];
        
                // Check the file extensions, if it not
                // included in the allowed extensions
                // we show the error
                const fileExtension =
                    inputFile?.type.split("/")[1];
                if (
                    !allowedExtensions.includes(fileExtension)
                ) {
                    setError("Please input a csv file");
                    return;
                }
        
                // If input type is correct set the state
                setFile(inputFile.originFileObj);
                e.file.status = 'done';
            }
        };
        
        //   const handleFieldMapping = (csvField, appField) => {
        //     setFieldMappings((prevMappings) => ({ ...prevMappings, [csvField]: appField }));
        //   };
        
          const onFinish = (values) => {
            // Process mapped data based on fieldMappings
            onSubmit(values, fieldMappings);
          };

            const handleDownload = () => {
              const link = document.createElement('a');
              link.href = '../files/employeeDirectorySampleCsv.csv'; // host the files somewhere and provide full path
              link.download ="employeeDirectorySampleCsv.csv";
              link.click();
          
              link.remove();
            };
          
         
          return (
            <Form layout="vertical" style={{
                width: '60%',
                margin: 'auto',
                backgroundColor: white,
                padding: '45px 60px',
                borderRadius: '5px'
            }} onFinish={onFinish}>
              <h1 style={{margin: '0px', fontWeight: '500', color: 'grey'}}>Upload CSV</h1>
              <span style={{color: 'grey'}}>Upload your CSV file with employee information 
               <br/> 
                </span> 
              <br/> 
              <Form.Item name="csvFile" style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Upload
                  name="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  customRequest= {(e) => {
                    // Prevent default upload behavior
                  }}
                >
                    <br/>
                  {processingCSV ? <div><br/><Spinner text={'Processing file'}/><br/><br/><br/><br/><br/></div> : <Button type='primary' icon={<UploadOutlined />}>Click to Upload</Button>}
                  <br/>
                  <br/>
                </Upload>
              </Form.Item>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '-25px'
              }}>
              <Tooltip placement='bottom' title="Download sample CSV file here">
                Sample file: <DownloadOutlined onClick={handleDownload} style={{color: infoColor, fontSize: '18px', cursor: 'pointer'}}/>
                </Tooltip>
              </div>
              {/* <Form.Item>
                <Button type="primary" htmlType="submit" onClick={() => {
                    setShowMappingScreen(true);
                }}>
                  Next <ArrowRightOutlined />
                </Button>
              </Form.Item> */}
            </Form>
          );
        };

  const [companyDataLoading, setCompanyDataLoading] = useState(true);

  const [company, setCompany] = useState(null);

  useEffect(()=>{
    if(localStorage.getItem('companyhris') == null){
      message.warning('Please create your company profile first');
    }
  }, []);

  useEffect(()=>{
    if(state.currentEmployee){
      setCompanyDataLoading(true);
      getCompanyById(localStorage.getItem('companyhris'), state.apiToken).then(res => {
        setCompany(res.data);
        setCompanyDataLoading(false);
      }).catch(res => {
        setCompany(null);
        setCompanyDataLoading(false);
      })
    }
  }, [state.currentEmployee])
    
    return (<div
        style={{

        }}
        >
            { companyDataLoading || !localStorage.getItem('companyhris') ? <Spinner height={'50vh'} text={'Loading...'}/> : company?.employeesBulkDataPublished ? 
            <div>
            <Result
            status="success"
            title="Employees directory has successfully been created"
            subTitle={"The employee directory is the bases of an HRIS application."}
            extra={[
             
            ]}
          /></div> : !showMappingScreen ? <CsvUploadForm /> : 
            fieldsData.length > 0 ?
            <FieldMapping csvFieldNames={fieldsData} appFieldNames={[
                { value: 'firstName', label: 'First Name' },
                { value: 'lastName', label: 'Last Name' },
                { value: 'email', label: 'Work Email' },
                { value: 'managerEmail', label: 'Manager Email' },
                { value: 'jobTitle', label: 'Job Title' },
                { value: 'startDate', label: 'Start Date' },
                { value: 'department', label: 'Department (Optional)' },
                ]} mandatoryFields={[
                    { value: 'firstName', label: 'First Name' },
                    { value: 'lastName', label: 'Last Name' },
                    { value: 'email', label: 'Work Email' },
                    { value: 'managerEmail', label: 'Manager Email' },
                    { value: 'jobTitle', label: 'Job Title' },
                    { value: 'startDate', label: 'Start Date' }
                ]}
                employeesWithCsvFields={employeesWithCsvFields} />
                :
                <></>
            }
        </div>);
    }

export default EmployeesDirectory;