package com.example.web_content_management_back.dto;
import com.example.web_content_management_back.util.EncryptionUtil;
import javax.crypto.SecretKey;

import lombok.Data;

@Data
public class DatabaseDTO {
    private String id;
    private String name;
    private String type;
    private String connectionString;
    private String description;
    private String username;
    private String password;

    public void encryptPassword(SecretKey secretKey) throws Exception {
            this.password = EncryptionUtil.encrypt(this.password, secretKey);
        }

        public void decryptPassword(SecretKey secretKey) throws Exception {
            this.password = EncryptionUtil.decrypt(this.password, secretKey);
        }
}