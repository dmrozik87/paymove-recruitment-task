package io.paymove.recruitment.controller;

import io.paymove.recruitment.model.Comment;
import io.paymove.recruitment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment newComment = commentService.createComment(comment);
        return ResponseEntity.ok(newComment);
    }

    @GetMapping("/{ipId}")
    public ResponseEntity<Set<Comment>> getCommentsByIpId(@PathVariable UUID ipId) {
        Set<Comment> comments = commentService.getCommentsByIpId(ipId);
        return ResponseEntity.ok(comments);
    }
}
