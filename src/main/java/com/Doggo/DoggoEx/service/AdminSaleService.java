package com.Doggo.DoggoEx.service;

import com.Doggo.DoggoEx.dto.SaleDto;
import com.Doggo.DoggoEx.entity.Sale;
import com.Doggo.DoggoEx.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AdminSaleService {
    private final SaleRepository saleRepository;        // 판매
    private final SaleService saleService;  // SaleService의 convertEntityToDto를 사용하기 위해 가져옴

    // 전체 조회 → saleService에 있는거 쓰기로 함


    // 송장 입력 (수정하는 형식 가져옴 - 빈 json에 내용을 채워서 저장하는 방식으로?)
//    @Transactional // 예외 발생시 롤백
    public boolean invoiceNum(Long id, String orderStatus, Integer invoice) {
        try {
            if (invoice != null && invoice != 0){
            String invoiceStr = String.valueOf(invoice);    // 문자타입으로 바꿔서 String인지 Integer인지 구분.
            if(!invoiceStr.matches("[0-9]+")) {
                throw new IllegalArgumentException("송장번호는 숫자로만 작성 가능합니다.");
            }}
            Sale sale = saleRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 판매 내역이 존재하지 않습니다.")
            );
            if (invoice != null && invoice != 0) {
                sale.setInvoice(invoice);
            }
            if (orderStatus != null && !orderStatus.isEmpty()) {
                sale.setOrderStatus(orderStatus);
            }else {sale.setOrderStatus("준비중");}
            saleRepository.save(sale);  // 송장번호 "" 에서 변경된거 저장
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    // 페이지네이션
    public List<SaleDto> getSaleList(int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Sale> salesPage;
        if ("all".equals(filter) || filter == null || filter.isEmpty()) {
            // 필터가 "all"이거나 비어있는 경우 모든 데이터를 가져옴
            salesPage = saleRepository.findAll(pageable);
        } else {
            // 특정 필터 조건에 맞는 데이터를 가져옴 (부분 일치 검색)
            salesPage = saleRepository.findByOrderStatusContaining(filter, pageable);
        }
        List<Sale> sales = salesPage.getContent();
        List<SaleDto> saleDtos = new ArrayList<>();
        for(Sale sale : sales) {
            saleDtos.add(saleService.convertEntityToDto(sale));
        }
        return saleDtos;
    }

    // 페이지 수 계산
    public int getSalePage(Pageable pageable, String filter) {
        Page<Sale> salesPage;
        if ("all".equals(filter) || filter == null || filter.isEmpty()) {
            salesPage = saleRepository.findAll(pageable);
        } else {
            // 특정 필터 조건에 맞는 데이터를 가져옴 (부분 일치 검색)
            salesPage = saleRepository.findByOrderStatusContaining(filter, pageable);
        }

        return salesPage.getTotalPages();
    }
}
