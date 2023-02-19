import { IconButton } from '@mui/material'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';

function PasswordInput({
    className,
    value,
    defaultValue,
    placeholder,
    name,
    id,
}) {

    const [passwordShow, setPasswordShow] = useState(true);

    return (
        <Box className='passwordFld'>
            <input
                type={passwordShow ? 'password' : 'text'}
                className={className} value={value}
                placeholder={placeholder}
                name={name}
                defaultValue={defaultValue}
                id={id} />
            <IconButton onClick={() => setPasswordShow(!passwordShow)} className="password_icon">
                {passwordShow ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </Box>
    )
}

export default PasswordInput
