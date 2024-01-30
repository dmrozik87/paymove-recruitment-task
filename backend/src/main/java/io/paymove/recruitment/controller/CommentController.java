package io.paymove.recruitment.controller;

import io.paymove.recruitment.model.Comment;
import io.paymove.recruitment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

/**
 * The controller for REST endpoints related to Comment entity.
 */
@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    /**
     * Creates new comment from provided data
     * @param comment Comment object
     * @return ResponseEntity with new Comment object
     */
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment newComment = commentService.createComment(comment);
        return ResponseEntity.ok(newComment);
    }

    /**
     * Returns set of comments for improvement proposal with given ID
     * @param ipId ID of improvement proposal
     * @return ResponseEntity with set of Comment objects
     */
    @GetMapping("/{ipId}")
    public ResponseEntity<Set<Comment>> getCommentsByIpId(@PathVariable UUID ipId) {
        Set<Comment> comments = commentService.getCommentsByIpId(ipId);
        return ResponseEntity.ok(comments);
    }
}
