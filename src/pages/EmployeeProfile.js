import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Row, Col, Button, Upload, message, Tag } from 'antd';
import { FileSearchOutlined, IdcardOutlined, Loading3QuartersOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useAppContext } from '../context/AppContext';
import { attachmentNameForStorage } from '../utility';
import { getEmployeeByEmail, updateEmployeeProfile } from '../services/employeeService';
import { uploadFileToFirebaseStorage } from '../firebase/storage';
import './EmployeeProfile.css';
import { infoColor, primaryTextColor } from '../css';
import ToolBanner from '../components/ToolBanner';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const { Title, Text } = Typography;

const ProfileCard = ({ info }) => {
    const [imageUrl, setImageUrl] = useState(info?.imageUrl);

    const [uploadingImage, setUploadingImage] = useState(false);

    const {state, saveCurrentEmployee} = useAppContext();

    const employeeIdFromUrl = useParams().id; 

    useEffect(() => {
        setImageUrl(info?.imageUrl);
    }, [info?.imageUrl]);


const calculateTenure = (startDate) => {
    const start = dayjs(startDate);
    const now = dayjs();
    const years = now.diff(start, "year");
    const months = now.diff(start.add(years, "year"), "month");
    return `${years} year${years > 1 ? "s" : ""}, ${months} month${months > 1 ? "s" : ""}`;
  };
  
    const handleUpload = async ({ file }) => {
        setUploadingImage(true);
        // Dummy upload logic, replace with actual upload logic
        // const isImage = file.type.startsWith('image/');
        // if (!isImage) {
        //     message.error('You can only upload image files!');
        //     return;
        // }

        // const reader = new FileReader();
        // reader.onload = () => setImageUrl(reader.result);
        // reader.readAsDataURL(file);
        const attachmentName = attachmentNameForStorage(file.name, state.currentEmployee.id, Date.now());

        let attachmentUrl = null;

        await uploadFileToFirebaseStorage(file, 'profileImages', attachmentName).then((res) => {
            attachmentUrl = res.url;
        }).catch((error) => {
            console.log(error);
            message.error(error.message);
        })

        updateEmployeeProfile(state.currentEmployee.email, {imageUrl: attachmentUrl}, state.apiToken).then((res) => {
            setUploadingImage(false);
            message.success('Image uploaded successfully');
            setImageUrl(attachmentUrl);
            saveCurrentEmployee({ ...state.currentEmployee, imageUrl: attachmentUrl});
        }).catch((error) => {
            message.error(error.message);
            setUploadingImage(false);
        })

        console.log(file);
    };

    return ( info && <>
        <Card style={{ width: '100%', border: '0px'}}>
            <Row gutter={24} style={{
                display: 'flex', justifyContent: 'flex-start'
            }}>
                <Col style={{ marginRight: '10px', marginLeft: '40px', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                    < div
                        className='fluid-border'
                    >
                        <img className='circular-image' src={imageUrl} alt={info.firstName} />
                        </div>
                        <br/>
                    {uploadingImage ? <Loading3QuartersOutlined spin /> : employeeIdFromUrl == state.currentEmployee?.email && <div align="center" style={{cursor: 'pointer', width: '100%', display: 'block'}}> <Upload
                        showUploadList={false}
                        beforeUpload={() => false} // Prevent automatic upload
                        onChange={handleUpload}
                    >
                        <span><UploadOutlined style={{color: infoColor}} />&nbsp; Change</span>
                    </Upload> </div>}
                </Col>
                <Col style={{display: 'flex', alignItems: 'flex-start'}}>
                    <div>
                    <Title style={{color: primaryTextColor, padding: '0px', margin: '0px', marginBottom: '4px'}} level={2}>{`${info.firstName} ${info.lastName}`}</Title>
                    <Text ><Tag>{info.jobTitle}</Tag></Text>
                    <div style={{ marginTop: 24 }}>
                        <Text strong>Email: </Text>
                        <Text>{info.email}</Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Text strong>Manager Email: </Text>
                        <Text>{info.managerEmail}</Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Text strong>Tenure: </Text>
                        <Text>{calculateTenure(info.startDate)}</Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        {info.roles && <Text strong>Roles: &nbsp;</Text>  }
                        <Text>{info.roles?.map(role => {
                            return <Tag key={role}>{role}</Tag>;
                        })}</Text>
                    </div>
                    </div>
                </Col>
            </Row>
        </Card>
        </>
    );
};

export default function EmployeeProfile() {
    const {state} = useAppContext();
    const [info, setInfo] = useState();
    const employeeIdFromUrl = useParams().id; 

    const [loadingProfile, setLoadingProfile] = useState(false);

    useEffect(() => {
        setLoadingProfile(true);
        getEmployeeByEmail(employeeIdFromUrl, state.apiToken).then(res => {
            setInfo(res.data);
            setLoadingProfile(false);
        }).catch(() => {
            message.error('Something went wrong');
            setLoadingProfile(false);
        })
    }, []);
    return <>
    <ToolBanner title="Employee Profile" subTitle={'See Public Information About Employees'} icon={<FileSearchOutlined />} />

    {loadingProfile ? <Spinner height={'50vh'} text={'loading profile'} /> : <ProfileCard info={info} />}
   </>
}
