package com.Doggo.DoggoEx.service;

import com.Doggo.DoggoEx.dto.BoardDto;
import com.Doggo.DoggoEx.entity.Board;
import com.Doggo.DoggoEx.entity.Sale;
import com.Doggo.DoggoEx.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminBoardService {
    private final BoardRepository boardRepository; // 1:1 문의
    private final BoardService boardService;

    // 문의 전체 조회 → PostService꺼 쓰면 될듯

    // 문의 1:1 상세 조회
    public BoardDto getBoardDetail(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(
                () -> new RuntimeException("해당 문의가 존재하지 않습니다.")
        );
        return boardService.convertEntityToDto(board);
    }

    // 문의 답변 업로드
    public boolean QnaAnswer(Long id, String answer) {
        try {
            Board board = boardRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 판매 내역이 존재하지 않습니다.")
            );
            board.setAnswer(answer);   // 송장번호를 받음
            boardRepository.save(board);  // 송장번호 "" 에서 변경된거 저장
            return true;
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return false;
        }
    }

    // 페이지네이션
    public List<BoardDto> getBoardList(int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Board> boardPage;
        if ("all".equals(filter) || filter == null || filter.isEmpty()) {
            boardPage = boardRepository.findAll(pageable);
        } else {
            if ("answered".equals(filter)) {
                boardPage = boardRepository.findByAnswerIsNotNull(pageable);
            } else if ("unanswered".equals(filter)) {
                boardPage = boardRepository.findByAnswerIsNull(pageable);
            } else {
                boardPage = boardRepository.findByAnswerContaining(filter, pageable);
            }
        }

        List<Board> boards = boardPage.getContent();
        List<BoardDto> boardDtos = new ArrayList<>();
        for (Board board : boards) {
            boardDtos.add(boardService.convertEntityToDto(board));
        }
        return boardDtos;
    }

    // 페이지 수 조회
    public int getBoardPage(Pageable pageable, String filter) {
        Page<Board> boardPage;
        if ("all".equals(filter) || filter == null || filter.isEmpty()) {
            boardPage = boardRepository.findAll(pageable);
        } else {
            if ("answered".equals(filter)) {
                boardPage = boardRepository.findByAnswerIsNotNull(pageable);
            } else if ("unanswered".equals(filter)) {
                boardPage = boardRepository.findByAnswerIsNull(pageable);
            } else {
                boardPage = boardRepository.findByAnswerContaining(filter, pageable);
            }
        }

        return boardPage.getTotalPages();
    }
}
