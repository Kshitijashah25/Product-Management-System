package com.inventory.productmanagementsystem.Service;

import com.inventory.productmanagementsystem.Controller.UserController;
import com.inventory.productmanagementsystem.Model.Complaint;
import com.inventory.productmanagementsystem.Repository.ComplaintRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintService {
    private final ComplaintRepository complaintRepository;
    private static final Logger logger = LoggerFactory.getLogger(ComplaintService.class);

    @Autowired
    public ComplaintService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    public List<Complaint> getComplaints() {
        logger.info("Getting all the complaints from database and sending to API.");
        List<Complaint> complaintList = complaintRepository.findAll();
        complaintList.forEach((complaint) -> {
            complaint.getUser().getComplaintList().clear();
            complaint.getUser().getOrderList().clear();
        });
        return complaintList;
    }

    public ResponseEntity<String> addComplaint(String content) {
        logger.info("Adding complaint with current time.");
        Complaint complaint = new Complaint(LocalDateTime.now(), content);
        complaint.setCreatedAt(LocalDateTime.now());
        Complaint savedComplaint = complaintRepository.save(complaint);
        if (savedComplaint.getContent().equals(complaint.getContent())) {
            logger.info("Complaint registered successfully.");
            return ResponseEntity.ok().body("Complaint Registered.");
        } else {
            logger.warn("Some error occurred while registering the complaint.");
            return ResponseEntity.status(400).body("Error in registering complaint.");
        }
    }

    public ResponseEntity<String> deleteComplaint(Long id) {
        if (!complaintRepository.existsById(id)) {
            logger.warn("complaint with id: " + id + " doesn't exist. So giving warning to the user.");
            return ResponseEntity.status(400).body("Complaint with id: " + id + " doesn't exist.");
        } else {
            complaintRepository.deleteById(id);
            logger.info("Complaint deleted successfully.");
            return ResponseEntity.status(200).body("Complaint deleted successfully.");
        }
    }

    @Transactional
    public ResponseEntity<String> updateComplaint(Long complaintId, String content) {
        logger.info("Finding complaint with given complaint id: " + complaintId);
        Complaint complaint = complaintRepository.findById(complaintId).orElseThrow(() -> new IllegalStateException("Complaint with id: " + complaintId + " doesn't exist."));
        complaint.setContent(content);
        complaint.setCreatedAt(LocalDateTime.now());
        logger.info("Updating the complaint with new content.");
        return ResponseEntity.status(200).body("Complaint updated successfully.");
    }
}
