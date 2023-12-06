#include <stdio.h>
#include <math.h>

long long int binaryToDecimal(long long number){
    int binary,i=0,decimal=0;
    while(number!=0){
        int digit = number % 10;
        decimal += digit * pow(2,i);
        number /= 10;
        i++;
    }
    return decimal;
}
void decimalToBinary(){
    printf("Decimal to binary sectiniz!");
}
int main(){
    int sayi;
    long long binary;
    printf("hangi yolu seçersin binary to decimal 1 \n decimal to binary 0! :");
    scanf("%d",&sayi);
    if(sayi == 1){
        printf("binary numara giriniz: ");
        scanf("%d",&binary);
        printf("%lld",binaryToDecimal(binary));
    }else{
        decimalToBinary();
    }
    return 0;
}
